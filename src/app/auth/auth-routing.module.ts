import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'login',
              loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
          },
          {
              path: 'register',
              loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
          },
          {
              path: 'forgot-password',
              loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
          },
          {
              path: '',
              redirectTo: 'login',
              pathMatch: 'full'
          }
      ]
  },
  {
      path: '',
      redirectTo: 'auth/login',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
