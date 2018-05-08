import { inject, injectable } from 'inversify';
import { Connection, MysqlError } from 'mysql';
import TYPES from '../types';
import { sqlPrimer } from './base.service';

export interface IImageKindService {
  listImageKinds(cb: (sqlErr: MysqlError, results: any) => void): void;
}

@injectable()
export class ImageKindService implements IImageKindService {
  private sqlListImageKinds = sqlPrimer(`
SELECT 'id', 'name', 'desc'
FROM 'ImageKind'
`);

  constructor(
    @inject(TYPES.Connection) private dbConn: Connection
  ) { }

  listImageKinds(cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlListImageKinds,
        (sqlErr, results) => cb(sqlErr, results)
      );
  }
}
