import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'multi-img-ip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-img-ip.component.html',
  styleUrls: ['./multi-img-ip.component.css']
})
export class MultiImgIpComponent {
  images: { file: File; url: string }[] = [];
  maxImages = 10;
  msg = '';

  @Output() imagesSelected = new EventEmitter<string[]>(); // emit array of image URLs

  onMultiFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    let newImagesCount = 0;

    for (let file of files) {
      if (!file.type.startsWith('image/')) continue;

      if (this.images.length + newImagesCount >= this.maxImages) {
        alert('You cannot add more than 10 images');
        break;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.images.push({
          file: file,
          url: e.target?.result as string
        });
        this.emitImages(); // emit after each image is loaded
      };
      reader.readAsDataURL(file);
      newImagesCount++;
    }

    input.value = ''; // Reset input
    this.msg = '';
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.emitImages(); // emit updated images list after removal
  }

  clearAll(): void {
    this.images = [];
    this.msg = '';
    this.emitImages(); // emit empty list after clear
  }

  private emitImages() {
    const urls = this.images.map(img => img.url);
    this.imagesSelected.emit(urls);
  }
}
