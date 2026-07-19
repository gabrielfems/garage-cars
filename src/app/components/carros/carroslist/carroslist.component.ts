import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from 'app/services/carro.service';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "");

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carrosService = inject(CarroService);

  constructor() {
    this.findAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroEditado) {
      const indice = this.lista.findIndex(x => { return x.id == carroEditado.id });
      this.lista[indice] = carroEditado;
    }

    if (carroNovo) {
      carroNovo.id = this.lista.length + 1;
      this.lista.push(carroNovo);
    }
  }

  findAll() {

    this.carrosService.findAll().subscribe({
      next: lista => { //quando retornar o que se espera
        this.lista = lista;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
      }
    });
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

        this.carrosService.deleteById(carro.id).subscribe({
          next: mensagem => { //quando retornar o que se espera
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
            Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });

      }
    });
  }

  new() {
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    this.carroEdit = Object.assign({}, carro); //clonando pra evitar referência de Objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro) {
    if (carro.id > 0) {
      let indice = this.lista.findIndex(x => { return x.id == carro.id });
      this.lista[indice] = carro;
    } else {
      carro.id = this.lista.length + 1;
      this.lista.push(carro);
    }

    this.modalRef.close();
  }
}
