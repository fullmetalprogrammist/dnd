import { IJsonDataSourceConfig } from "./IJsonDataSourceConfig";
import { IPostgresDataSourceConfig } from "./IPostgresDataSourceConfig";
import { z } from "zod";

export const dataSourceConfig = createDataSourceConfig();

function createDataSourceConfig(): DataSourceConfig {
  const dataSourceType = z.enum(['json', 'postgres'])
    .parse(process.env.DATA_SOURCE_TYPE);

  if (dataSourceType === "json") {
    return createJsonDataSourceConfig();
  } else if (dataSourceType === "postgres") {
    return createPostgresDataSourceConfig();
  }

  throw new Error("Невозможно создать конфиг приложения, т.к. не указан источник данных");
}

type DataSourceConfig = 
  | ReturnType<typeof createJsonDataSourceConfig>
  | ReturnType<typeof createPostgresDataSourceConfig>;

function createJsonDataSourceConfig(): IJsonDataSourceConfig {
  const JsonSchema = z.object({
    DATA_SOURCE_TYPE: z.string(),
    BASE_URL: z.string(),
    JSON_DATA_PATH: z.string(),
    PIC_SCENES_PATH: z.string(),
    PIC_CHARACTERS_PATH: z.string()
  }).transform(env => ({
    dataSourceType: env.DATA_SOURCE_TYPE,
    dataFilePath: env.JSON_DATA_PATH,
    baseUrl: env.BASE_URL,
    picturesPath: {
      scenes: env.PIC_SCENES_PATH,
      characters: env.PIC_CHARACTERS_PATH
    }
  }));

  return JsonSchema.parse(process.env);
}

function createPostgresDataSourceConfig(): IPostgresDataSourceConfig {
  const PostgresSchema = z.object({
    DATA_SOURCE_TYPE: z.string(),
    BASE_URL: z.string(),
    PIC_SCENES_PATH: z.string(),
    PIC_CHARACTERS_PATH: z.string()
  }).transform(env => ({
    dataSourceType: env.DATA_SOURCE_TYPE,
    baseUrl: env.BASE_URL,
    picturesPath: {
      scenes: env.PIC_SCENES_PATH,
      characters: env.PIC_CHARACTERS_PATH
    }
  }));

  return PostgresSchema.parse(process.env);
}