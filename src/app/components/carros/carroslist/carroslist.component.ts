import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";

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

  constructor() {
    this.lista.push(new Carro(1, 'Civic'));
    this.lista.push(new Carro(2, 'Corolla'));
    this.lista.push(new Carro(3, 'Golf'));
    this.lista.push(new Carro(4, 'Mustang'));

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
        const indice = this.lista.findIndex(x => { return x.id == carro.id });
        this.lista.splice(indice, 1);

        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
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
    if(carro.id > 0){
      let indice = this.lista.findIndex( x => { return x.id == carro.id });
      this.lista[indice] = carro;
    } else {
      carro.id = this.lista.length + 1;
      this.lista.push(carro);
    }

    this.modalRef.close();
  }
}
