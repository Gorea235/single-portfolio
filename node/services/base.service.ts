const sqlPrimerRe = /'/g;

export function sqlPrimer(sql: string): string {
  // in order to stop excessive \` in the SQL strings,
  // we use ' and replace with ` later
  // this will only affect boot time, and not by much
  return sql.replace(sqlPrimerRe, '`');
}
