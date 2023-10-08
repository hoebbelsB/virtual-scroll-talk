import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  DynamicSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/experimental/virtual-scrolling';

import { DataService, Item } from '../shared/data.service';
import { DemoComponentState } from '../shared/demo-component.state';
import { DemoPanelModule } from '../shared/demo-panel/demo-panel.component';
import { ItemComponent } from '../shared/item/item.component';
import { ListHeaderComponent } from '../shared/item/list-header.component';

@Component({
  selector: 'dynamic-size',
  template: `
    <div>
      <h3>Dynamic Size Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        #demoPanel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(templateCacheSize)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <list-header/>
        <rx-virtual-scroll-viewport
          [runwayItems]="state.runwayItems"
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          [dynamic]="itemSize"
          #viewport
        >
          <item
            class="dynamic-size"
            [style.height.px]="itemSize(item)"
            *rxVirtualFor="
              let item of state.dataService.items;
              trackBy: state.dataService.trackItem;
              renderCallback: state.renderCallback$;
              templateCacheSize: state.viewCache;
              strategy: demoPanel.strategyChange;
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
      .item__description {
        height: 70px;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService, DemoComponentState],
  standalone: true,
  imports: [
    RxVirtualFor,
    DynamicSizeVirtualScrollStrategy,
    RxVirtualScrollViewportComponent,
    CommonModule,
    DemoPanelModule,
    ItemComponent,
    ListHeaderComponent,
    MatIconModule
  ]
})
export class DynamicSizeComponent {
  itemSize = (item: Item) => (item.description ? 165 : 90);

  constructor(public state: DemoComponentState) {}
}

