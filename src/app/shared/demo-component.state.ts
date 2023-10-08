import {
  ChangeDetectorRef,
  ElementRef,
  Inject,
  Injectable,
  NgZone, OnDestroy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
  RxVirtualScrollDefaultOptions,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
export class DemoComponentState {
  readonly renderCallback$ = new Subject<any>();

  renderedItems$: Subject<number> = new Subject<number>();

  items$ = this.dataService.items$;

  runwayItems = this.defaults.runwayItems;
  runwayItemsOpposite = this.defaults.runwayItemsOpposite;

  showViewport = true;

  private _viewCache = this.defaults.templateCacheSize;
  get viewCache() {
    return this._viewCache as number;
  }
  set viewCache(cache: number) {
    this._viewCache = cache;
  }

  constructor(
    public dataService: DataService,
    @Inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS)
    private defaults: RxVirtualScrollDefaultOptions
  ) {
/*    this.renderCallback$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.ngZone.run(() =>
        this.renderedItems$.next(
          this.elementRef.nativeElement.querySelectorAll('.item').length
        )
      );
    });*/
  }
}
