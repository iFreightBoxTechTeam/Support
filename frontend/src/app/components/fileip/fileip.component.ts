
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fileip',
  templateUrl: './fileip.component.html',
  styleUrls: ['./fileip.component.css']
})
export class FileipComponent {
  url: string | null = null;
  msg = "";

  @Output() imageSelected = new EventEmitter<string | null>();

  selectFile(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.msg = 'You must select an image';
      return;
    }

    if (!file.type.match(/image\/*/)) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
      this.msg = "";
      this.imageSelected.emit(this.url);
    };
    reader.readAsDataURL(file);
  }

  clearImage() {
    this.url = null;
    this.msg = '';
    this.imageSelected.emit(null);
  }
}