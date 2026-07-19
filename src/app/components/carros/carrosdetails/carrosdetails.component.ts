import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carro } from 'app/models/carro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import Swal from 'sweetalert2'
import { CarroService } from 'app/services/carro.service';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  carrosService = inject(CarroService);


  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carrosService.findById(id).subscribe({
      next: carro => {
        this.carro = carro;
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
    if (this.carro.id > 0) {

      this.carrosService.update(this.carro, this.carro.id).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Editado com sucesso!!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['/admin/carros'], { state: { carroEditado: this.carro } });
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
      this.carrosService.save(this.carro).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Salvo com sucesso!!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['/admin/carros'], { state: { carroNovo: this.carro } });
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
    this.retorno.emit(this.carro);
  }
}
