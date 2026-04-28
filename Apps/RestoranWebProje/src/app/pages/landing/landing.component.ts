import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { AmbianceComponent } from '../../components/ambiance/ambiance.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    AmbianceComponent,
    ContactComponent
  ],
  template: `
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-ambiance></app-ambiance>
      <app-contact></app-contact>
    </main>
  `,
  styles: []
})
export class LandingComponent {}
