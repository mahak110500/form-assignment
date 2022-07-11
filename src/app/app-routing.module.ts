import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTableComponent } from './edit-table/edit-table.component';
import { ReactiveEditComponent } from './reactive-edit/reactive-edit.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { TemplateEditComponent } from './template-edit/template-edit.component';

const routes: Routes = [
  {
    component: TemplateDrivenComponent,
    path: ''
  },
  {
    component: ReactiveFormsComponent,
    path: 'reactive-forms'
  },
  {
      component: TemplateEditComponent,
      path: 'template-edit/:id'
  },
  {
    component: EditTableComponent,
    path: 'edit-table'
  },
  {
    component: ReactiveEditComponent,
    path: 'reactive-edit/:id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
