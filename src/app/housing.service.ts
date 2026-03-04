import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  protected housingLocationList: HousingLocation[] = []
  url = "http://localhost:3000/locations"

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);

    console.log(response);
    return await response.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`);

    console.log(response);
    return await response.json() ?? {};
  }
  async submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} with email ${email}`);
  }

}
