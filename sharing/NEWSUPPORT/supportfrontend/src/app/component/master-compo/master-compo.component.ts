import { Component, ElementRef, HostListener, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-master-compo',
  templateUrl: './master-compo.component.html',
  styleUrls: ['./master-compo.component.css']
})

export class MasterCompoComponent implements AfterViewInit {
  @Input() popup = false;
  @Output() clickOutside = new EventEmitter<void>();
  @ViewChild('popupRef') popupRef!: ElementRef;
  panelStyles: any = {};

  ngAfterViewInit(): void {
    setTimeout(() => {
      const trigger = document.getElementById('settings-trigger');
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        this.panelStyles = {
          position: 'fixed',
          top: `${rect.bottom + 10}px`,
          left: `${rect.right - 320}px`
        };
      }
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.popupRef?.nativeElement.contains(event.target);
    const gearClicked = (event.target as HTMLElement).closest('#settings-trigger');
    if (!clickedInside && !gearClicked) {
      this.clickOutside.emit();
    }
  }

  hidePanel() {
    this.clickOutside.emit();
  }
}