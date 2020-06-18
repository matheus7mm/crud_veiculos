import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoListComponent } from './veiculos/veiculo-list/veiculo-list.component';
import { VeiculoCreateComponent } from './veiculos/veiculo-create/veiculo-create.component';

const routes: Routes = [
  { path: '', component: VeiculoListComponent },
  { path: 'create', component: VeiculoCreateComponent },
  { path: 'edit/:veiculoId', component: VeiculoCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
