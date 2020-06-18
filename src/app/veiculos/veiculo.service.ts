import { Veiculo } from './veiculo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private veiculos: Veiculo[] = [];
  private veiculosUpdated = new Subject<{ veiculos: Veiculo[], veiculoCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getVeiculos(veiculosPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${veiculosPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, veiculos: any, maxVeiculos: number }>('http://localhost:3000/api/veiculos' + queryParams)
      .pipe(map((veiculoData) => {
        return {
          veiculos: veiculoData.veiculos.map(veiculo => {
            return {
              placa: veiculo.placa,
              chassi: veiculo.chassi,
              renavam: veiculo.renavam,
              modelo: veiculo.modelo,
              marca: veiculo.marca,
              ano: veiculo.ano,
              id: veiculo._id
            };
          }),
          maxVeiculos: veiculoData.maxVeiculos
        };
      }))
      .subscribe((transformedVeiculoData) => {
        this.veiculos = transformedVeiculoData.veiculos;
        this.veiculosUpdated.next({
          veiculos: [...this.veiculos],
          veiculoCount: transformedVeiculoData.maxVeiculos
        });
      });
  }

  getVeiculoUpdatedListener() {
    return this.veiculosUpdated.asObservable();
  }

  getVeiculo(id: string) {
    return this.http.get<{
      _id: string,
      placa: string,
      chassi: string,
      renavam: number,
      modelo: string,
      marca: string,
      ano: number
    }>('http://localhost:3000/api/veiculos/' + id);
  }

  addVeiculo(
    placa: string,
    chassi: string,
    renavam: number,
    modelo: string,
    marca: string,
    ano: number
  ) {
    const veiculo: Veiculo = {
      id: null,
      placa: placa,
      chassi: chassi,
      renavam: renavam,
      modelo: modelo,
      marca: marca,
      ano: ano
    };
    this.http.post<{ message: string, veiculoId: string }>('http://localhost:3000/api/veiculos', veiculo)
      .subscribe((responseData) => {
        this.router.navigate(["/"]);
      });
  }

  updateVeiculo(
    id: string,
    placa: string,
    chassi: string,
    renavam: number,
    modelo: string,
    marca: string,
    ano: number
  ) {
    const veiculo: Veiculo = {
      id: id,
      placa: placa,
      chassi: chassi,
      renavam: renavam,
      modelo: modelo,
      marca: marca,
      ano: ano
    };
    this.http.put('http://localhost:3000/api/veiculos/' + id, veiculo)
      .subscribe((response) => {
        this.router.navigate(["/"]);
      });
  }

  deleteVeiculo(veiculoId: string) {
    return this.http.delete('http://localhost:3000/api/veiculos/' + veiculoId);
  }
}
