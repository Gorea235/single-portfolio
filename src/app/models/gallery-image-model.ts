import { CategoryModel } from './category-model';

export class GalleryImageModel {
    id: number;
    dateTaken: Date;
    imageId: string;

    categories: CategoryModel[];
}
