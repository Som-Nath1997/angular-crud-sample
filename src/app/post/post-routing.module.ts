import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{IndexComponent} from './index/index.component';
import{CreateComponent} from './create/create.component'
import{EditComponent} from './edit/edit.component'

const routes: Routes = [
  { path: '', redirectTo: 'post/index', pathMatch: 'full'},
  { path: 'post/index', component: IndexComponent },
  { path: 'post/create', component: CreateComponent },
  { path: 'post/:postId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
