import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  @ViewChild('internalInfoContainer') internalInfoContainer: ElementRef;
  @Input() offset: number;

  contactHelpTexts = [
    'Click to expand',
    'Click to shrink'
  ];
  contactHelpText = 'Click to expand';
  showInfo = false;
  infoHeight = 0;
  infoText: string[];

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig(ConfigService.keyContactInfo)
      .subscribe(cnf => {
        this.infoText = cnf.value.split('\n');
      });
  }

  get internalInfoContainerActualHeight(): number {
    return this.internalInfoContainer.nativeElement.scrollHeight;
  }

  footerClicked(): void {
    this.showInfo = !this.showInfo;
    this.contactHelpText = this.contactHelpTexts[Number(this.showInfo)];
    this.infoHeight = this.showInfo ? this.internalInfoContainerActualHeight : 0;
  }
}
