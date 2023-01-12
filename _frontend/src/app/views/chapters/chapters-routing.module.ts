import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChaptersComponent } from './chapters.component';
import { ChaptersDetailComponent } from './ChapterDetail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ChaptersComponent,
    data: {
      title: `Chapters`
    },
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ChaptersDetailComponent,
    data: {
      title: `Chapter Parts`
    },
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChaptersRoutingModule {
}
