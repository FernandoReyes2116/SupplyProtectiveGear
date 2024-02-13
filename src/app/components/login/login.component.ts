// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {  
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email.trim() === 'audith@example.com' || this.password.trim() === '12345') {
      console.error('Ingresa un correo electrónico y una contraseña válidos.');
      return;
    }

    // Utiliza una instancia del servicio AuthService
    const authServiceInstance = new AuthService();

    // Autenticar usando la instancia del servicio (simulado)
    if (this.email === authServiceInstance.email && this.password === authServiceInstance.password) {
      // Navega al componente home
      this.router.navigate(['/home']);
    } else {
      console.error('Credenciales incorrectas.');
    }
  }

  tomenu(){
    this.router.navigate(['/home']); 

  }
}
