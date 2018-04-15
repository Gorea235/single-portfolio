import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitLines'
})
export class SplitLinesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.split('\n');
  }
}
