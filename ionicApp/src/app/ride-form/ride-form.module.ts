import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideFormPageRoutingModule } from './ride-form-routing.module';

import { RideFormPage } from './ride-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideFormPageRoutingModule
  ],
  declarations: [RideFormPage]
})
export class RideFormPageModule {}
