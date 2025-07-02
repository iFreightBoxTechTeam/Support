import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  showPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  hidePopup() {
    this.showPopup = false;
  }
}
