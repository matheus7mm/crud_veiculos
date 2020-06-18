import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Veiculo } from '../veiculo.model';
import { VeiculosService } from '../veiculo.service';
import { PageEvent, MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit, OnDestroy {

  veiculos: Veiculo[] = [];
  isLoading = false; // Para controlar a exibição do loading spinner
  totalVeiculos = 0;
  veiculosPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private veiculosSub: Subscription;

  constructor(public veiculosService: VeiculosService, public dialog: MatDialog) { }

  ngOnInit() {
    // Para exibir o spinner
    this.isLoading = true;
    this.veiculosService.getVeiculos(this.veiculosPerPage, this.currentPage);
    this.veiculosSub = this.veiculosService.getVeiculoUpdatedListener().
      subscribe((veiculoData: { veiculos: Veiculo[], veiculoCount: number }) => {
        // Para parar de exibir o spinner
        this.isLoading = false;
        this.totalVeiculos = veiculoData.veiculoCount;
        this.veiculos = veiculoData.veiculos;
      });
  }

  onChangePage(pageData: PageEvent) {
    // Para exibir o spinner
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.veiculosPerPage = pageData.pageSize;
    this.veiculosService.getVeiculos(this.veiculosPerPage, this.currentPage);
  }

  onDelete(veiculoId: string) {

    const message = `Tem certeza que deseja excluir este veículo?`;

    const dialogData = new ConfirmDialogModel("Mensagem de Confirmação", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) { // Se houver confirmação de exclusão
        // Para exibir o spinner
        this.isLoading = true;
        this.veiculosService.deleteVeiculo(veiculoId)
          .subscribe(() => {
            this.veiculosService.getVeiculos(this.veiculosPerPage, this.currentPage);
          });
      }
    });
  }

  ngOnDestroy() {
    this.veiculosSub.unsubscribe();
  }
}
