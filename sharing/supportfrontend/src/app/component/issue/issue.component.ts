import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() issueId!: number | string;

  overallStatus: string = 'Open';
  description: string = 'This is a hardcoded issue with pre-defined images.';
  assignTo: string = '';
  Status: string = 'Open';

  users: string[] = ['Vijay', 'Shreya', 'Riddhi'];
  selectedImageUrl: string | null = null;

  imageCounter: number = 0; // Will be set based on last image ID

  images: Array<{
    id: string;
    url: string;
    file: File | null;
    assignTo: string;
    status: string;
    overallStatus: string;
  }> = [
    {
      id: 'IMG-001',
      url: 'https://via.placeholder.com/150',
      file: null,
      assignTo: 'Vijaya',
      status: 'Open',
      overallStatus: 'Open'
    },
    {
      id: 'IMG-002',
      url: 'https://via.placeholder.com/160',
      file: null,
      assignTo: 'Shreya',
      status: 'In Progress',
      overallStatus: 'Open'
    },
    {
      id: 'IMG-003',
      url: 'https://via.placeholder.com/170',
      file: null,
      assignTo: 'Riddhi',
      status: 'Resolved',
      overallStatus: 'Open'
    }
  ];

  ngOnInit(): void {
    console.log('Received issue ID:', this.issueId);

    // ✅ Auto set imageCounter based on the highest current image number
    const maxId = this.images.reduce((max, img) => {
      const num = parseInt(img.id.split('-')[1]);
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);

    this.imageCounter = maxId;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageCounter++; // Auto increment image ID
          const newImage = {
            id: `IMG-${this.imageCounter.toString().padStart(3, '0')}`,
            url: e.target.result,
            file,
            assignTo: '',
            status: 'Open',
            overallStatus: this.overallStatus
          };
          this.images.push(newImage);
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

  saveIssue(): void {
    console.log('Saving issue:', {
      id: this.issueId,
      status: this.overallStatus,
      description: this.description,
      images: this.images
    });
  }
}
