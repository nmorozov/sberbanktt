export interface ICountry {
  code: string;
  name: string;
}

export class Country implements ICountry {
  code: string;

  name: string;

  constructor(country) {
    this.mapFromDTO(country);
  }

  private mapFromDTO(country) {
    this.code = country.code;
    this.name = country.name;
  }
}
