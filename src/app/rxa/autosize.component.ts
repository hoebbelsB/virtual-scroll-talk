import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  AutoSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/experimental/virtual-scrolling';

import { DataService, Item } from '../shared/data.service';
import { DemoComponentState } from '../shared/demo-component.state';
import { DemoPanelModule } from '../shared/demo-panel/demo-panel.component';
import { ItemComponent } from '../shared/item/item.component';
import { ListHeaderComponent } from '../shared/item/list-header.component';

@Component({
  selector: 'auto-size',
  template: `
    <div>
      <h3>Autosize Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        #demoPanel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [withStableScrollbar]="true"
        [(stableScrollbar)]="stableScrollbar"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(templateCacheSize)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <list-header/>
        <rx-virtual-scroll-viewport
          [runwayItems]="state.runwayItems"
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          [withSyncScrollbar]="stableScrollbar"
          [tombstoneSize]="100"
          autosize
          #viewport
        >
          <item
            class="autosize"
            *rxVirtualFor="
              let item of state.dataService.items;
              renderCallback: state.renderCallback$;
              templateCacheSize: state.viewCache;
              strategy: demoPanel.strategyChange;
              trackBy: state.dataService.trackItem;
              let i = index;
            "
            (update)="state.dataService.updateItem(item)"
            (remove)="state.dataService.removeItem(item)"
            (moveDown)="state.dataService.moveItem(item, i, i + 1)"
            [item]="item">
            <div class="item__description" *ngIf="item.description">
              <div class="desc-title"><mat-icon>description</mat-icon> Additional Info</div>
              <div>{{ item.description }}</div>
            </div>
          </item>
        </rx-virtual-scroll-viewport>
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
    `,
  ],
  providers: [DataService, DemoComponentState],
  standalone: true,
  imports: [
    CommonModule,
    DemoPanelModule,
    RxVirtualFor,
    AutoSizeVirtualScrollStrategy,
    RxVirtualScrollViewportComponent,
    ItemComponent,
    MatIconModule,
    ListHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutosizeComponent {
  stableScrollbar = true;
  trackItem = (i: number, item: Item) => item.id;
  constructor(public state: DemoComponentState) {}
}

