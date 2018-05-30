import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigModel } from '../../../models/config.model';
import { GalleryModel } from '../../../models/gallery.model';
import { ConfigService } from '../../../services/config.service';
import { GalleryService } from '../../../services/gallery.service';
import { NewGalleryDialogComponent } from '../new-gallery-dialog/new-gallery-dialog.component';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css']
})
export class AdminEditorComponent implements OnInit {
  @Input() onGalleriesUpdated: EventEmitter<any>;

  title: ConfigModel = { key: null, value: '' };
  contactInfo: ConfigModel = { key: null, value: '' };

  constructor(
    private configService: ConfigService,
    private galleryService: GalleryService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.configService.getConfig(ConfigService.keyPortfolioTitle)
      .subscribe(cnf => this.title = cnf);
    this.configService.getConfig(ConfigService.keyContactInfo)
      .subscribe(cnf => this.contactInfo = cnf);
  }

  openNewGalleryDialog(event): void {
    this.dialog
      .open(NewGalleryDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) this.createNewGallery(result);
      });
  }

  createNewGallery(data: GalleryModel): void {
    this.galleryService.createGallery(data)
      .subscribe(status => {
        if (status === 200 || status === 201) this.onGalleriesUpdated.emit();
        else alert('Unable to create gallery');
      });
  }

  itemUpdateHandler(status: number): void {
    if (status !== 200) alert('An error occured while performing the update');
  }

  updateTitle(): void {
    this.configService.setConfig(this.title)
      .subscribe(status => this.itemUpdateHandler(status));
  }

  updateContactInfo(): void {
    this.configService.setConfig(this.contactInfo)
      .subscribe(status => this.itemUpdateHandler(status));
  }
}
