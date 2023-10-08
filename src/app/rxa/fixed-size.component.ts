import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/experimental/virtual-scrolling';

import { DataService } from '../shared/data.service';
import { DemoComponentState } from '../shared/demo-component.state';
import { DemoPanelModule } from '../shared/demo-panel/demo-panel.component';
import { ItemComponent } from '../shared/item/item.component';
import { ListHeaderComponent } from '../shared/item/list-header.component';

@Component({
  selector: 'fixed-size',
  template: `
    <h3>Fixed Size Strategy</h3>
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
          #viewport
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          [runwayItems]="state.runwayItems"
          [itemSize]="90"
        >
          <item
            class="fixed-size"
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
            [item]="item" />
        </rx-virtual-scroll-viewport>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  imports: [
    RxVirtualScrollViewportComponent,
    RxVirtualFor,
    FixedSizeVirtualScrollStrategy,
    CommonModule,
    DemoPanelModule,
    MatIconModule,
    ItemComponent,
    ListHeaderComponent,
  ]
})
export class FixedSizeComponent {
  constructor(public state: DemoComponentState) {}
}

