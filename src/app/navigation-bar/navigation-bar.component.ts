import { Component, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';

const DEBOUNCE_IN_MS = 500;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent implements OnDestroy {
  @Output() queryChange: Subject<string>;

  private _query: string = '';
  private _intervalId = 0;

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    clearTimeout(this._intervalId);
    this._intervalId = setTimeout(() => {
      this.queryChange.next(value);
    }, DEBOUNCE_IN_MS);
    this._query = value;
  }

  constructor() {
    this.queryChange = new Subject<string>();
  }

  ngOnDestroy() {
    this.queryChange.unsubscribe();
    if (this._intervalId) {
      clearTimeout(this._intervalId);
    }
  }
}
