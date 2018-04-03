import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent implements OnInit {
  @ViewChild('homeContent') homeContent: ElementRef;

  imageCount = 4;
  sidebarWidth: number;
  sidebarVisible = true;
  sidebarStyle: {};

  get contentHeight() {
    return this.homeContent.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
    this.adjustSidebar();
  }

  onResize(event): void {
    this.adjustSidebar();
  }

  adjustSidebar(): void {
    this.sidebarWidth = this.sidebarVisible ? this.contentHeight / this.imageCount : 0;
    this.updateSidebarStyle();
  }

  updateSidebarStyle(): void {
    this.sidebarStyle = {
      'width.px': this.sidebarWidth,
      'display': this.sidebarVisible ? undefined : 'none'
    };
  }
}
