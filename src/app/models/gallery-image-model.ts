import { CategoryModel } from './category-model';

export class GalleryImageModel {
    id: number;
    dateTaken: Date;
    url: string;

    categories: CategoryModel[];
}
