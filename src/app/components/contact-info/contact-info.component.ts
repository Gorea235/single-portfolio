import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ConfigModel } from '../../models/config.model';

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
  contactHelpText = this.contactHelpTexts[0];
  showInfo = false;
  infoHeight = 0;
  contactInfo: ConfigModel;

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig(ConfigService.keyContactInfo)
      .subscribe(cnf => {
        this.contactInfo = cnf;
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
