import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { VeiculoCreateComponent } from './veiculos/veiculo-create/veiculo-create.component';
import { HeaderComponent } from './header/header.component';
import { VeiculoListComponent } from './veiculos/veiculo-list/veiculo-list.component';
import { AppRoutingModule } from './app-routing.module';

// Componentes para mensagens modais
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    VeiculoCreateComponent,
    HeaderComponent,
    VeiculoListComponent,
    ConfirmDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
