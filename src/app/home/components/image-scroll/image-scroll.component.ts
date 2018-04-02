import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-image-scroll',
  templateUrl: './image-scroll.component.html',
  styleUrls: ['./image-scroll.component.css']
})
export class ImageScrollComponent {
  @Input('size') size: number;
  @Input('active') active: boolean;
}
