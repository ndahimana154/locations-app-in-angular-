import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}"/>
  <section class="listing-description">    <h2 class="listing-heading">{{housingLocation?.name}}</h2>
  <h2 class="listing-heading">{{housingLocation?.name}}</h2>     
  <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
  </section>
  <section class="listing-features">
    <h2 class="section-heading">About</h2>
    <ul>
      <li>Units available: {{housingLocation?.availableUnits}}</li>
      <li>Does this location have Wifi?: {{housingLocation?.wifi ? 'Yes' : 'No'}}</li>
      <li>Laundry: {{housingLocation?.laundry ? 'Yes' : 'No'}}</li>
    </ul>
  </section>
  <section class="listing-apply">
    <h2 class="section-heading">Interested in this location?</h2>
<form [formGroup]="applyForm" (submit)="submitApplication()">
<label for="firstName"> First Name</label>
<input id="first-name" type="text" formControlName="firstName"/>

<label for="lastName"> Last Name</label>
<input id="last-name" type="text" formControlName="lastName"/>

<label for="email"> Email</label>
<input id="email" type="email" formControlName="email"/>

<button type="submit" class="primary">Submit Application</button>
</form>

</section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);

  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingService.getHousingLocationById(housingLocationId).then(location => {
      this.housingLocation = location
    })
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
