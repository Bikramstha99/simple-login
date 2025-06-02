import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router) {}

  onLogin() {
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please enter both username and password.');
    }
  }
}
