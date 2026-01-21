export interface IDataSourceConfig {
  dataSourceType: string;
  baseUrl: string;
  picturesPath: {
    scenes: string;
    characters: string;
  }
}