import { Component } from '@angular/core';

@Component({
  selector: 'app-issuse',
  templateUrl: './issuse.component.html',
  styleUrls: ['./issuse.component.css']
})
export class IssuseComponent {
  
 searchTerm: string = '';
 issues = [
  {
    id: 101,
    description: 'Login button not working',
    user: 'Alice',
    raisedDate: new Date('2025-06-01'),
    status: '',
    assignTo: '',
    imageUrl: '',
    module: ''
  },
  
];
showAddButton: any;

editIssue(id: number) {
  console.log('Edit issue', id);
  
}

deleteIssue(id: number) {
  console.log('Delete issue', id);
 
}

viewLog(id: number) {
  console.log('View log for issue', id);
 
}

onSearch(term: string) {}
  tenant = {
    user: 'TenantCode123' 
  };

  
}

