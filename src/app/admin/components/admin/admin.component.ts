import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  onGalleriesUpdated: EventEmitter<any> = new EventEmitter<any>();
}
