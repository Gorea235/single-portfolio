import { Connection, MysqlError } from 'mysql';
import { sqlPrimer } from './base.service';

export class ImageKindService {
  private sqlListImageKinds = sqlPrimer(`
SELECT 'id', 'name', 'desc'
FROM 'ImageKind'
`);

  constructor(
    private dbConn: Connection
  ) { }

  public listImageKinds(cb: (sqlErr: MysqlError, results: any) => void) {
    this.dbConn
      .query(
        this.sqlListImageKinds,
        (sqlErr, results) => cb(sqlErr, results)
      );
  }
}
