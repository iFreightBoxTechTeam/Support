import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() perPage = new EventEmitter<number>(); // emit number, not string

  ngOnInit(): void {
    console.log("Total Pages:", this.totalPages);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }

  changePageSize(event: any) {
    const value = +event.target.value;
    this.perPage.emit(value);  // emit selected value
    this.changePage(1); // reset to page 1
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
