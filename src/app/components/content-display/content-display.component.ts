import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent implements OnInit {
  imageCount = 4;
  minWidth = 992;

  @ViewChild('homeContent') homeContent: ElementRef;

  sidebarWidth: number;
  sidebarVisible = true;
  sidebarStyle: {};

  get contentWidth() {
    return this.homeContent.nativeElement.offsetWidth;
  }

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
    this.sidebarVisible = this.contentWidth >= this.minWidth;
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
