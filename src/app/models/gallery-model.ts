import { GalleryImageModel } from './gallery-image-model';

export class GalleryModel {
    id: number;
    name: string;
    dateAdded: Date;
    dateUpdated: Date;

    images: GalleryImageModel[];
}
