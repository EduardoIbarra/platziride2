import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideFormPage } from './ride-form.page';

const routes: Routes = [
  {
    path: '',
    component: RideFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideFormPageRoutingModule {}
