import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];

  constructor() {
    this.lista.push(new Carro(1, 'Civic'));
    this.lista.push(new Carro(2, 'Corolla'));
    this.lista.push(new Carro(3, 'Golf'));
    this.lista.push(new Carro(4, 'Mustang'));

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroEditado) {
      const indice = this.lista.findIndex(x => { return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;
    }

    if (carroNovo) {
      carroNovo.id = this.lista.length + 1;
      this.lista.push(carroNovo);
    }
  }

  deleteById(carro: Carro) {

    Swal.fire({
          title: `Deseja realmente excluir o carro ${carro.nome}?`,
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não' 
        }).then((result) => {
          if (result.isConfirmed) {
            const indice = this.lista.findIndex(x => { return x.id == carro.id});
            this.lista.splice(indice, 1);

            Swal.fire({
                  title: 'Deletado com sucesso!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
          }
        });
  }
}
