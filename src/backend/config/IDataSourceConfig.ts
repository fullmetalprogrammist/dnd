export interface IDataSourceConfig { 
  baseUrl: string;
  dataSourceType: string;
  picturesPath: {
    scenes: string;
    characters: string;
  }
}