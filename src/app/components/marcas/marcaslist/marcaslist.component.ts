import { Marca } from '../../../models/marca';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { MarcasdetailsComponent } from "../marcasdetails/marcasdetails.component";
import { MarcaService } from 'app/services/marca.service';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {
  marcas: Marca[] = [];
  marcaEdit: Marca = new Marca(0, "", "");

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  marcaService = inject(MarcaService);

  constructor() {
    this.findAll();

    let marcaNovo = history.state.marcaNovo;
    let marcaEditado = history.state.marcaEditado;

    if (marcaEditado) {
      const indice = this.marcas.findIndex(x => { return x.id == marcaEditado.id });
      this.marcas[indice] = marcaEditado;
    }

    if (marcaNovo) {
      marcaNovo.id = this.marcas.length + 1;
      this.marcas.push(marcaNovo);
    }
  }

  findAll() {

    this.marcaService.findAll().subscribe({
      next: lista => { //quando retornar o que se espera
        this.marcas = lista;
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

  deleteById(marca: Marca) {

    Swal.fire({
      title: `Deseja realmente excluir a marca ${marca.nome}?`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {

        this.marcaService.deleteById(marca.id).subscribe({
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
    this.marcaEdit = new Marca(0, "", "");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca); //clonando pra evitar referência de Objeto
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {
    if (marca.id > 0) {
      let indice = this.marcas.findIndex(x => { return x.id == marca.id });
      this.marcas[indice] = marca;
    } else {
      marca.id = this.marcas.length + 1;
      this.marcas.push(marca);
    }

    this.modalRef.close();
  }

  select(marca: Marca) {
    this.retorno.emit(marca);
  }
}
