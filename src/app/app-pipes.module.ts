import { NgModule } from '@angular/core';
import { IteratorPipe } from './pipes/iterator.pipe';
import { SplitLinesPipe } from './pipes/split-lines.pipe';

const pipes = [
  IteratorPipe,
  SplitLinesPipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class AppPipesModule { }
