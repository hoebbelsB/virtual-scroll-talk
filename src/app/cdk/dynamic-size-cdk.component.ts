import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  CdkAutoSizeVirtualScroll, ScrollingModule
} from '@angular/cdk-experimental/scrolling';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RxVirtualFor } from '@rx-angular/template/experimental/virtual-scrolling';
import { DataService, Item } from '../shared/data.service';
import { DemoComponentState } from '../shared/demo-component.state';
import { DemoPanelModule } from '../shared/demo-panel/demo-panel.component';
import { ItemComponent } from '../shared/item/item.component';
import { ListHeaderComponent } from '../shared/item/list-header.component';

@Component({
  selector: 'dynamic-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Autosize Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        [withStrategy]="false"
        [scrollToExperimental]="true"
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(templateCacheSize)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <list-header />
        <cdk-virtual-scroll-viewport autosize #viewport style="height: 100%">
          <item
            class="dynamic-size"
            [style.height.px]="itemSize(item)"
            *cdkVirtualFor="
              let item of state.dataService.items;
              trackBy: state.dataService.trackItem;
              templateCacheSize: state.viewCache;
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
      .item__description {
        height: 70px;
        overflow: hidden;
      }
    `,
  ],
  providers: [DataService, DemoComponentState],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DemoPanelModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    DatePipe,
    ScrollingModule,
    ItemComponent,
    MatIconModule,
    ListHeaderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSizeCdkComponent {
  itemSize = (item: Item) => (item.description ? 165 : 90);
  constructor(public state: DemoComponentState) {}
}
