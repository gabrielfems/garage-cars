import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carro } from 'app/models/carro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  carro: Carro = new Carro(0, "");
  router = inject(ActivatedRoute);
  router2 = inject(Router);



  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    //Simulação de busca de carro por id
    let carroRetornado: Carro = new Carro(id, "Golf");
    this.carro = carroRetornado;
  }

  save(){
    if(this.carro.id > 0){
      Swal.fire({
      title: 'Editado com sucesso!!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
      this.router2.navigate(['/admin/carros'], { state: { carroEditado: this.carro } });

    } else {   
      Swal.fire({
      title: 'Salvo com sucesso!!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
        this.router2.navigate(['/admin/carros'], { state: { carroNovo: this.carro } });
    }
  }
}
