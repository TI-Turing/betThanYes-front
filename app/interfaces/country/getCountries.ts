export interface GetCountriesResponse {
  Code: string; // Mapeo de [code] [char](2)
  Name: string; // Mapeo de [name] [varchar](255)
  FullName: string; // Mapeo de [full_name] [varchar](255)
  Iso3: string; // Mapeo de [iso3] [char](3)
  Number: string; // Mapeo de [number] [char](3)
  ContinentCode: string; // Mapeo de [continent_code] [char](2)
}