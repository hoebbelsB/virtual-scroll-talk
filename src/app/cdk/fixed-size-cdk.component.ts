import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule
} from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defer, from } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { DemoComponentState } from '../shared/demo-component.state';
import { DemoPanelModule } from '../shared/demo-panel/demo-panel.component';
import { ItemComponent } from '../shared/item/item.component';
import { ListHeaderComponent } from '../shared/item/list-header.component';

@Component({
  selector: 'fixed-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Fixed Size Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        [withStrategy]="false"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="renderedItems$ | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(templateCacheSize)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <list-header />
        <cdk-virtual-scroll-viewport
          [itemSize]="90"
          #viewport
          style="height: 100%"
        >
          <item
            class="fixed-size"
            *cdkVirtualFor="
              let item of state.dataService.items;
              trackBy: state.dataService.trackItem;
              templateCacheSize: state.viewCache;
              let i = index;
            "
            (update)="state.dataService.updateItem(item)"
            (remove)="state.dataService.removeItem(item)"
            (moveDown)="state.dataService.moveItem(item, i, i + 1)"
            [item]="item" />
        </cdk-virtual-scroll-viewport>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .item {
        height: 90px;
        overflow: hidden;
      }
    `,
  ],
  providers: [DataService, DemoComponentState],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    DemoPanelModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    DatePipe,
    ItemComponent,
    ListHeaderComponent
  ]
})
export class FixedSizeCdkComponent {
  @ViewChildren('item') items!: QueryList<ElementRef<HTMLElement>>;

  renderedItems$ = defer(() =>
    from(Promise.resolve()).pipe(
      switchMap(() =>
        this.items.changes.pipe(
          startWith(null),
          map(() => this.items.length)
        )
      )
    )
  );
  constructor(public state: DemoComponentState) {}
}
