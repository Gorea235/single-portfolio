import { NgModule } from '@angular/core';
import { IteratorPipe } from './iterator.pipe';

const pipes = [
  IteratorPipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class AppPipesModule { }
