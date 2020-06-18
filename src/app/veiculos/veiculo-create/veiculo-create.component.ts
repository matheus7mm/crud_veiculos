import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { VeiculosService } from '../veiculo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Veiculo } from '../veiculo.model';
import { MessageDialogModel, MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  veiculo: Veiculo;
  isLoading = false; // Para controlar a exibição do loading spinner
  private mode = 'create';
  private veiculoId: string;

  constructor(public veiculosService: VeiculosService, public route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('veiculoId')) {
        this.mode = 'edit';
        this.veiculoId = paramMap.get('veiculoId');
        // Para exibir o spinner
        this.isLoading = true;
        this.veiculosService.getVeiculo(this.veiculoId)
          .subscribe((veiculoData) => {
            // Para parar de exibir o spinner
            this.isLoading = false;
            this.veiculo = {
              id: veiculoData._id,
              placa: veiculoData.placa,
              chassi: veiculoData.chassi,
              renavam: veiculoData.renavam,
              modelo: veiculoData.modelo,
              marca: veiculoData.marca,
              ano: veiculoData.ano
            }
          });
      } else {
        this.mode = 'create';
        this.veiculoId = null;
      }
    });
  }

  onSaveVeiculo(form: NgForm) {
    if (form.invalid) {
      return;
    }

    var message = "";

    // Para exibir o spinner
    this.isLoading = true;
    if (this.mode === 'create') { // Para cadastrar um novo veículo
      this.veiculosService.addVeiculo(
        form.value.placa,
        form.value.chassi,
        form.value.renavam,
        form.value.modelo,
        form.value.marca,
        form.value.ano
      );

      message = `Veículo ${form.value.placa} cadastrado com sucesso!`;
    } else { // Para editar um veículo
      this.veiculosService.updateVeiculo(
        this.veiculoId,
        form.value.placa,
        form.value.chassi,
        form.value.renavam,
        form.value.modelo,
        form.value.marca,
        form.value.ano
      )

      message = `Veículo ${form.value.placa} editado com sucesso!`;
    }

    const dialogData = new MessageDialogModel("Mensagem de Informação", message);

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      form.resetForm();
    });

  }

}
