import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() issueId!: number | string;
  @Output() issueUpdated = new EventEmitter<any>(); // ✅ Emit to parent when updated

  overallStatus: string = '';
  description: string = 'This is a hardcoded issue with pre-defined images.';
  assignTo: string = '';
  Status: string = '';
  apiUrl: any;

  users: string[] = ['Vijay', 'Shreya', 'Riddhi'];
  selectedImageUrl: string | null = null;

  imageCounter: number = 0;
  showIssueModal: boolean = false;

  @ViewChild(IssueComponent) issueComponent!: IssueComponent;

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

  issue: any;
  private issueData: any;

  constructor(private issueService: IssueService, private http: HttpClient) {}

  ngOnInit() {
    this.issue = this.issueService.getIssue() || {};
    if (!this.issue || Object.keys(this.issue).length === 0) {
      console.log("Error: Issue is not set correctly in issue.component.ts");
    }
    console.log("Loaded Issue in issue.component.ts:", this.issue);
  }

  setIssue(issue: any) {
    if (!issue) {
      console.error("Error: Trying to set an undefined issue.");
      return;
    }
    this.issueData = issue;
    console.log("Issue stored in components:", this.issueData);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageCounter++;
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

  updateIssue(userId: number, issueData: any) {
    console.log('Sending issue data:', issueData);
    this.issueService.updateIssue(userId, issueData).subscribe(
      (response) => {
        console.log('Issue updated successfully:', response);
      },
      (error) => {
        console.error('Error updating issue:', error);
      }
    );
  }

  openImageModal(url: string): void {
    this.selectedImageUrl = url;
  }

  closeImageModal(): void {
    this.selectedImageUrl = null;
  }

saveIssue() {
  const payload = {
    StatusName: this.issue.StatusName,
    AssignTo: this.assignTo || this.issue.AssignTo,
    ImagePaths: this.images.map(img => img.url)
  };

  console.log("Sending PUT payload:", payload);
  


  this.http.put(`https://localhost:44321/api/values/${this.issue.UserId}`, payload)
    .subscribe(
      res => {
        console.log("this.issue.StatusName = ", this.issue.StatusName);
        console.log("Update success", res);


        // Fetch the updated issue

      },
      err => {
      }
    );
}



  getIssue() {
    return this.issueService.getIssue() || null;
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  openIssueModal(userId: number): void {
    console.log("Fetching history for user ID:", userId);
    this.issueService.getissueById(userId).subscribe(
      (response) => {
        this.issue = response[0];
        this.issueId = userId;
        this.showIssueModal = true;
        console.log("Fetched Issue Details:", this.issue);
      },
      (error) => {
        console.error("Error fetching issue:", error);
      }
    );
  }

  closeIssueModal(): void {
    this.showIssueModal = false;
  }
}
