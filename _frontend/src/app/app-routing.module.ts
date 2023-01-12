import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
// import { Page404Component } from './views/pages/page404/page404.component';
// import { Page500Component } from './views/pages/page500/page500.component';
// import { LoginComponent } from './views/pages/login/login.component';
// import { RegisterComponent } from './views/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'songs',
        loadChildren: () =>
          import('./views/songs/songs.module').then((m) => m.SongsModule)
      },
      {
        path: 'chapters',
        loadChildren: () =>
          import('./views/chapters/chapters.module').then((m) => m.ChaptersModule)
      },
      {
        path: 'self_affirmation',
        loadChildren: () =>
          import('./views/self_affirmation/self_affirmation.module').then((m) => m.SelfAffirmationModule)
      },
      {
        path: 'android_app_version',
        loadChildren: () =>
          import('./views/android_app_version/android_app_version.module').then((m) => m.AndroidAppVersionModule)
      },
      {
        path: 'daily_update_alert',
        loadChildren: () =>
          import('./views/daily_update_alert/daily_update_alert.module').then((m) => m.DailyUpdateAlertModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'api_keys',
        loadChildren: () =>
          import('./views/api_keys/api_keys.module').then((m) => m.APIKeysModule)
      }
    ]
  },
  // {
  //   path: '404',
  //   component: Page404Component,
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   component: Page500Component,
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
