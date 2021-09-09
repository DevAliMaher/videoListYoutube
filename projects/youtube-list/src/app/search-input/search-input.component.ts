import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { InputDataModel } from 'projects/youtube-list/src/app/core/models/input-data.model';

@Component({
  selector: 'app-search-input',
  template: `
    <input
      type="text"
      [placeholder]="inputData.placeholder"
      (input)="userInput.emit($any($event.target).value)"
    />
    <span class="material-icons-round positionIcon">{{
      inputData.materialIcon
    }}</span>
  `,
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  @Input() inputData: InputDataModel = {
    placeholder: 'Placeholder',
    materialIcon: 'keyboard',
  };
  @Output() userInput = new EventEmitter<string>();
}
