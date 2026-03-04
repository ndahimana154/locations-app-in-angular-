import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
   <section>
    <form> 
      <input type="text" placeholder="Search for a home by city..." #filter/>
      <button type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation"/>
  <section *ngIf="filteredLocationList.length === 0">
    <p class="no-results">No results found.</p>
  </section>
</section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingService = inject(HousingService);

  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then(locations => {
      this.filteredLocationList = locations;
      this.housingLocationList = locations;
    });
  }

  filterResults(text: string) {
    if (!text)
      this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(location =>
      location.city.toLowerCase().includes(text.toLowerCase()));

  }
}
