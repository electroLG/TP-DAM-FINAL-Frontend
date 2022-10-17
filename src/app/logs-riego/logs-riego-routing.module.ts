import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsRiegoPage } from './logs-riego.page';

const routes: Routes = [
  {
    path: '',
    component: LogsRiegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsRiegoPageRoutingModule {}
