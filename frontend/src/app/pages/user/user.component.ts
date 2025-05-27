import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      passwordHash: this.password  // Match API's expected key
    };

    this.http.post('https://localhost:44378/api/values/register', user)
      .subscribe({
        next: () => {
          this.message = 'User registered successfully!';
          alert(this.message);
          this.router.navigate(['/login']);  // Optional: redirect to login
        },
        error: (err) => {
          console.error(err);
          this.message = err.error?.Message || 'Registration failed';
          alert(this.message);
        }
      });
  }
}
