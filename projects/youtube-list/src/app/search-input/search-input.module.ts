import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { SearchInputComponent } from './search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [SharedModule],
  exports: [SearchInputComponent],
})
export class SearchInputModule {}
