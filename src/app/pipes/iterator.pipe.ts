import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterator'
})
export class IteratorPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return Array(value).fill(0).map((x, i) => i);
  }
}
