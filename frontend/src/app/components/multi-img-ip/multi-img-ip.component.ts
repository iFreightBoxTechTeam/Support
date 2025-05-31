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

  // Called when user selects images from the file input
  onMultiFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    let newImagesCount = 0;

    //Store all image loading promises
    const readers: Promise<void>[] = [];

    for (let file of files) {
      if (!file.type.startsWith('image/')) continue;

      if (this.images.length + newImagesCount >= this.maxImages) {
        alert('You cannot add more than 10 images');
        break;
      }

      newImagesCount++;

      //  Wrap each FileReader in a Promise to control when we emit
      const reader = new FileReader();
      const promise = new Promise<void>((resolve) => {
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.images.push({
            file: file,
            url: e.target?.result as string
          });
          resolve(); // Signal that this image is done
        };
      });

      reader.readAsDataURL(file);
      readers.push(promise);
    }

    input.value = ''; // Reset input to allow selecting same file again
    this.msg = '';

    // Emit images only once after all FileReaders are done
    Promise.all(readers).then(() => {
      this.emitImages(); // Emit final list only once
    });
  }

  // Remove a single image
  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.emitImages(); // emit updated images list after removal
  }

  // Clear all selected images
  clearAll(): void {
    this.images = [];
    this.msg = '';
    this.emitImages(); // emit empty list after clear
  }

  //  Emit array of image URLs to parent
  private emitImages() {
    const urls = this.images.map(img => img.url);
    this.imagesSelected.emit(urls); // only called once per batch now
  }
}
