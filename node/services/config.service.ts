import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { Connection, MysqlError } from 'mysql';
import { ErrorData, unauthorized } from '../errors';
import TYPES from '../types';
import { IAutherService } from './auther.service';
import { sqlPrimer } from './base.service';

export interface IConfigService {
  validKey(key: string): boolean;
  getConfig(key: string, valid: (sqlErr: MysqlError, results) => void, invalid: () => void): void;
  setConfig(key: string, value: string, req: Request,
    valid: (sqlErr: MysqlError, err: ErrorData, results) => void, invalid: () => void): void;
}

@injectable()
export class ConfigService implements IConfigService {
  // whitelist config values
  // using whitelist instead of blacklist for security
  private allowedConfigs = [
    'portfolio_title',
    'contact_info'
  ];

  // get config
  private sqlGetConfig = sqlPrimer(`
SELECT 'key', 'value'
FROM 'Config'
WHERE 'key' = ?
`);
  // set config
  private sqlSetConfig = sqlPrimer(`
UPDATE 'Config'
SET 'Value' = ?
WHERE 'Key' = ?
`);

  constructor(
    @inject(TYPES.IAutherService) private auther: IAutherService,
    @inject(TYPES.Connection) private dbConn: Connection
  ) { }

  validKey(key: string): boolean {
    // whitelist config keys
    if (this.allowedConfigs.find(el => el === key)) return true;
    else return false;
  }

  getConfig(key: string, valid: (sqlErr: MysqlError, results) => void, invalid: () => void): void {
    if (this.validKey(key)) {
      this.dbConn
        .query(
          this.sqlGetConfig,
          [key],
          (sqlErr, results) => valid(sqlErr, results)
        );
    } else invalid();
  }

  setConfig(key: string, value: string, req: Request,
    valid: (sqlErr: MysqlError, err: ErrorData, results) => void, invalid: () => void): void {
    if (this.validKey(key)) {
      this.auther.isLoggedIn(req, loggedIn => {
        if (loggedIn) {
          this.dbConn
            .query(
              this.sqlSetConfig,
              [value, key],
              (sqlErr, results) => valid(sqlErr, null, results)
            );
        } else {
          valid(null, unauthorized, null);
        }
      });
    } else invalid();
  }
}
