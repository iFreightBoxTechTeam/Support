
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
@Input() totalPages!: number;
  @Input() currentPage: number = 1;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() perPage = new EventEmitter<string>();
itemsPerPage: any;
Math: any;
filteredIssues: any;
// perPage:any;
setPage(page:number){
  this.currentPage=page
}

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }
  changePageSize(event:any) {
      console.log(event.target.value);
      this.perPage.emit(event.target.value)
      this.setPage=(event.page)
  }
        
}
