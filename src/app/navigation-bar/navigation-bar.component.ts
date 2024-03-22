import { Component, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, take } from 'rxjs';

const DEBOUNCE_IN_MS = 500;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent implements OnDestroy {
  private _queryParamSubscribtion$: Subscription;

  private _query: string = '';
  private _intervalId = 0;

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    clearTimeout(this._intervalId);
    this._query = value;

    if (this._queryParamSubscribtion$) {
      this._queryParamSubscribtion$.unsubscribe();
    }

    this._intervalId = setTimeout(() => {
      this.router.navigate([], {
        queryParams: { query: value.length > 0 ? value : undefined },
        queryParamsHandling: 'merge',
      });
    }, DEBOUNCE_IN_MS);
  }

  constructor(private router: Router, private activatedRouter: ActivatedRoute) {
    this._queryParamSubscribtion$ = Subscription.EMPTY;
  }

  ngOnInit() {
    this.activatedRouter.queryParamMap.subscribe((paramsMap) => {
      this._query = paramsMap.get('query') ?? '';
    });
  }

  ngOnDestroy() {
    if (this._intervalId) {
      clearTimeout(this._intervalId);
    }

    if (this._queryParamSubscribtion$) {
      this._queryParamSubscribtion$.unsubscribe();
    }
  }
}
