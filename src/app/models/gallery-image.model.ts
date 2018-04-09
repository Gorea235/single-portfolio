import { CategoryModel } from './category.model';
import { ImageKindModel } from './image-kind.model';

export interface GalleryImageModel {
    id: number;
    desc: string;
    dateTaken: string;
    imageData: string;

    galleryId: number;
    imageKind: ImageKindModel;
    categories: CategoryModel[];
}
