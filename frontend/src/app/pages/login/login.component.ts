import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//
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
  password: string = ''; // optional, for future use
  loginError: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit(): void {
    this.loginError = null;

    if (!this.name) return;

    this.userService.getUserByName(this.name).subscribe({
      next: (users) => {
        if (users.length > 0) {
          // Optional: check password here if needed
          console.log('Login success:', users[0]);
          this.router.navigate(['list']);
        } else {
          this.loginError = 'User not found.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = 'An error occurred during login.';
      }
    });
  }
}
