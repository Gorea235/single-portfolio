import { GalleryImageModel } from './gallery-image.model';

export interface GalleryModel {
  id: number;
  name: string;
  desc: string;
  dateAdded: string;
  dateUpdated: string;

  images?: GalleryImageModel[];
}
