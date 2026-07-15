import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar() {
    if (this.usuario === 'admin' && this.senha === 'admin') {
      this.router.navigate(['admin/carros']);
    } else 
      alert('Credenciais inválidas. Tente novamente.');
}
}
