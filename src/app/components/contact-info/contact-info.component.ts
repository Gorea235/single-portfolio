import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  @ViewChild('internalInfoContainer') internalInfoContainer: ElementRef;
  @Input() offset: number;

  contactHelpTexts = [
    'Click to expand',
    'Click to shrink'
  ];
  contactHelpText = 'Click to expand';
  showInfo = false;
  infoHeight = 0;

  get internalInfoContainerActualHeight(): number {
    return this.internalInfoContainer.nativeElement.scrollHeight;
  }

  footerClicked(): void {
    this.showInfo = !this.showInfo;
    this.contactHelpText = this.contactHelpTexts[Number(this.showInfo)];
    this.infoHeight = this.showInfo ? this.internalInfoContainerActualHeight : 0;
  }
}
