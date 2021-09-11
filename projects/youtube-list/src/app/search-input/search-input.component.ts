import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { InputDataModel } from 'projects/youtube-list/src/app/core/models/input-data.model';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  fromEvent,
  map,
  noop,
} from 'rxjs';

@Component({
  selector: 'app-search-input',
  template: `
    <input type="text" [placeholder]="inputData.placeholder" #userInput />
    <span class="material-icons-round positionIcon">{{
      inputData.materialIcon
    }}</span>
  `,
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements AfterViewInit {
  @Input() inputData: InputDataModel = {
    placeholder: 'Placeholder',
    materialIcon: 'keyboard',
  };
  @Output() userInput = new EventEmitter<string>();

  @ViewChild('userInput') userInputEl!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    fromEvent(this.userInputEl.nativeElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((input) => this.userInput.emit(input))
      )
      .subscribe(noop);
  }
}
