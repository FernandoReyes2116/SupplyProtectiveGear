// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: string = 'audith@example.com';
  password: string = '12345';
}
