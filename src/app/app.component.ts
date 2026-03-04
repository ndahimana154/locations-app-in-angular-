import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
@Component({
  standalone: true,
  selector: 'app-root',
  template: `<main>
  <header class="brand-name">
    <a  routerLink="/">
    <img class="brand-logo" src="/assets/logo.svg" alt="Logo" aria-hidden="true"/>
</a>
 <section class="content">
     <router-outlet/>
</section>
</header>
  </main>`,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule],
})
export class AppComponent {
  title = 'homes';
}
