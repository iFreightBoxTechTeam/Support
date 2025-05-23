import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatableService } from 'src/app/services/matable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-matable-form',
  templateUrl: './matable-form.component.html',
  styleUrls: ['./matable-form.component.css']
})
export class MatableFormComponent implements OnInit {
  matableForm: FormGroup;
  matableId: string | null = null;  // matableId could be string or null
  @Output() formSubmitted = new EventEmitter<void>(); // Event emitter to notify parent
    imageUrl: string |null =null;
 

  constructor(
    private fb: FormBuilder,
    private matableService: MatableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.matableForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      StatusName: ['Pending', Validators.required],
      TenantCode: ['', Validators.required],
      UserId: [0, Validators.required],
      ImagePaths: ['']
    });
  }

  ngOnInit(): void {
    // Get matableId from the route params
    this.matableId = this.route.snapshot.paramMap.get('id');
    
    if (this.matableId) {
      const id = Number(this.matableId);
      this.matableService.getMatableById(id).subscribe(
        (data: any) => {
          this.matableForm.patchValue(data);  // Fill the form with existing data
        },
        (error: any) => {
          console.error('Error fetching matable data for editing:', error);
        }
      );
    }
  }

  isComponentVisible = true; // Initially, the form is visible
    onImageSelected(url: string | null) {
    this.imageUrl = url;
  }
  

  onSubmit(): void {
    if (this.matableForm.valid) {
      const formData = { ...this.matableForm.value };
      formData.ImagePaths = formData.ImagePaths
        ? formData.ImagePaths.split(',').map((p: string) => p.trim())
        : [];

      if (this.matableId) {
        // Update existing matable
        const id = Number(this.matableId);
        this.matableService.updateMatable(id, formData).subscribe(
          () => {
            console.log('Update successful');
            this.matableForm.reset();
            this.router.navigate(['/']);
            this.formSubmitted.emit(); // Emit event after successful update
          },
          (error) => console.error('Update failed:', error)
        );
      } else {
        // Create new matable
        this.matableService.createMatable(formData).subscribe(
          () => {
            this.router.navigate(['/']);
            this.formSubmitted.emit(); // Emit event after successful creation
          },
          (error) => console.error('Create failed:', error)
        );
      }
    } else {
      console.warn('Form is invalid:', this.matableForm.value);
    }
  }
}
