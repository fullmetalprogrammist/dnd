import { IDataSourceConfig } from "./IDataSourceConfig";

export interface IJsonDataSourceConfig extends IDataSourceConfig {
  dataFilePath: string;
}