import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'signup',
    component:LoginComponent
  },
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
