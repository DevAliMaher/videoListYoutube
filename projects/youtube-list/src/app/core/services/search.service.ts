import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  userInputSubject$ = new Subject<string>();
  userInput$ = this.userInputSubject$.asObservable();
}
