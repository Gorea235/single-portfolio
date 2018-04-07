import { Connection, MysqlError } from 'mysql';
import { sqlPrimer } from './base.service';

export class SearchService {
    // gallery search SQL
    // searches 'name' and 'desc' columns
    private sqlGallerySearch = sqlPrimer(`
SELECT DISTINCT 'Galleries'.'id', 'Galleries'.'name', 'Galleries'.'desc',
    'Galleries'.'dateAdded', 'Galleries'.'dateUpdated'
FROM 'Galleries'
WHERE 'Galleries'.'name' LIKE ? OR 'Galleries'.'desc' LIKE ?
`);
    // gallery image search SQL
    // searches 'desc' column
    private sqlGalleryImageSearch = sqlPrimer(`
SELECT DISTINCT 'Galleries'.'id', 'Galleries'.'name', 'Galleries'.'desc',
    'Galleries'.'dateAdded', 'Galleries'.'dateUpdated'
FROM 'Galleries'
INNER JOIN 'GalleryImages' ON 'Galleries'.'id' = 'GalleryImages'.'galleryId'
WHERE 'GalleryImages'.'desc' LIKE ?
`);
    // image category search SQL
    // searches 'name' column
    private sqlGalleryImageCategorySearch = sqlPrimer(`
SELECT DISTINCT 'Galleries'.'id', 'Galleries'.'name', 'Galleries'.'desc',
    'Galleries'.'dateAdded', 'Galleries'.'dateUpdated'
FROM 'Galleries'
INNER JOIN 'GalleryImages' ON 'Galleries'.'id' = 'GalleryImages'.'galleryId'
INNER JOIN 'GalleryImageCategories' ON 'GalleryImages'.'id' = 'GalleryImageCategories'.'galleryImageId'
INNER JOIN 'Categories' ON 'GalleryImageCategories'.'categoryId' = 'Categories'.'id'
WHERE 'Categories'.'name' LIKE ?
`);
    // full image category search
    // includes 'desc' column search
    private sqlGalleryImageFullCategorySearch = this.sqlGalleryImageCategorySearch + sqlPrimer(`
OR 'Categories'.'desc' LIKE ?
`);
    // full search over all possible fields
    private sqlFullSearch = sqlPrimer(`
-- gallery search
${this.sqlGallerySearch}
UNION
-- gallery image search
${this.sqlGalleryImageSearch}
UNION
-- full category search
${this.sqlGalleryImageFullCategorySearch}
`);

    private searches = {
        'gallery:': {
            sql: this.sqlGallerySearch,
            times: 2
        },
        'image:': {
            sql: this.sqlGalleryImageSearch,
            times: 1
        },
        'category:': {
            sql: this.sqlGalleryImageCategorySearch,
            times: 1
        },
        'cat:': {
            sql: this.sqlGalleryImageCategorySearch,
            times: 1
        }
    };
    private defaultSearch = {
        sql: this.sqlFullSearch,
        times: 5
    };

    constructor(
        private dbConn: Connection
    ) { }

    search(term: string, cb: (sqlErr: MysqlError, results: any) => void): void {
        // build up search data
        const termSplit = term.split(':');
        if (termSplit[0]) termSplit[0] += ':'; // re-add search tag
        let sqlSearch: { sql: string, times: number } = null;
        if (termSplit[0] in this.searches && term.startsWith(termSplit[0])) {
            sqlSearch = this.searches[termSplit[0]];
            term = termSplit[1] || '';
        } else {
            sqlSearch = this.defaultSearch;
        }
        const search = `%${term}%`;
        const sqlParams = [];
        for (let i = 0; i < sqlSearch.times; i++)
            sqlParams.push(search);
        // do search
        this.dbConn.query(
            sqlSearch.sql,
            sqlParams,
            (sqlErr, results) => cb(sqlErr, results)
        );
    }
}
