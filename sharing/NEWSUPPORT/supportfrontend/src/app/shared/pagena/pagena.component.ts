import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagena',
  templateUrl: './pagena.component.html',
  styleUrls: ['./pagena.component.css']
})
export class PagenaComponent {
@Input() totalPages!: number;
  @Input() currentPage: number = 1;

  @Output() pageChanged = new EventEmitter<number>();
itemsPerPage: any;
Math: any;
filteredIssues: any;

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }

}
