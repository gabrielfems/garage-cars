import { FormsModule } from '@angular/forms';
import { Marca } from 'app/models/marca';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from 'app/services/marca.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca") marca: Marca = new Marca(0, "", "");
  @Output("retorno") retorno = new EventEmitter<Marca>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  marcaService = inject(MarcaService);

  findById(id: number) {
    this.marcaService.findById(id).subscribe({
      next: marca => {
        this.marca = marca;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save() {
    if (this.marca.id > 0) {

      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Editado com sucesso!!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['/admin/marcas'], { state: { marcaEditado: this.marca } });
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });

    } else {
      this.marcaService.save(this.marca).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Salvo com sucesso!!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['/admin/carros'], { state: { carroNovo: this.marca } });
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
    this.retorno.emit(this.marca);
  }
}