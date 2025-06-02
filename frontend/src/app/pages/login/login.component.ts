import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit(): void {
    this.loginError = null;

    if (!this.name || !this.password) {
      this.loginError = 'Username and password are required.';
      return;
    }

    this.userService.getUserByName(this.name).subscribe({
      next: (users) => {
        if (users.length > 0) {
          // You could verify the password here if your API returns one
          this.router.navigate(['list']);
        } else {
          this.loginError = 'User not found.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loginError = 'An error occurred during login.';
      }
    });
  }
}
