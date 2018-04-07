import { sqlPrimer } from './base.service';
import { Connection, MysqlError } from 'mysql';
import { AutherService } from './auther.service';
import { Request } from 'express';

export class ConfigService {
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
        private auther: AutherService,
        private dbConn: Connection
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
        valid: (sqlErr: MysqlError, err: string, results) => void, invalid: () => void): void {
        if (this.validKey(key)) {
            this.auther.isLoggedIn(req, loggedIn => {
                if (loggedIn) {
                    this.dbConn
                        .query(
                            this.sqlSetConfig,
                            [req.params.key, req.body.value],
                            (sqlErr, results) => valid(sqlErr, null, results)
                        );
                } else {
                    valid(null, 'unauthorised', null);
                }
            });
        } else invalid();
    }
}
