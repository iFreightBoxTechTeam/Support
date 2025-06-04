import { Component } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent {
  issueId: string = '';
  overallStatus: string = 'Open';
  description: string = '';
  assignTo: string = '';
  Status: string = 'Open';

  users: string[] = ['Vijaya', 'Shreya', 'Riddhi'];

  selectedImageUrl: string | null = null;

  images: Array<{
    url: string;
    file: File;
    assignTo: string;
    status: string;
    overallStatus: string;
  }> = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({
            url: e.target.result,
            file: file,
            assignTo: '',
            status: 'Open',
            overallStatus: this.overallStatus
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
  }

  openImageModal(url: string): void {
    this.selectedImageUrl = url;
  }

  closeImageModal(): void {
    this.selectedImageUrl = null;
  }

  saveIssue() {
    console.log('Saving issue:', {
      id: this.issueId,
      status: this.overallStatus,
      description: this.description,
      images: this.images
    });
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
