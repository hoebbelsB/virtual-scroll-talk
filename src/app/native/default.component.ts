import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DataService } from '../shared/data.service';
import { DemoComponentState } from '../shared/demo-component.state';
import { ItemComponent } from '../shared/item/item.component';
import { ListHeaderComponent } from '../shared/item/list-header.component';

@Component({
  selector: 'native',
  template: `
    <h3>Native List</h3>
    <div class="demo-list">
      <list-header/>
      <div class="scrollable">
        <item
          class="content-visibility"
          *ngFor="
              let item of state.dataService.items;
              trackBy: state.dataService.trackItem;
              let i = index;
            "
          (update)="state.dataService.updateItem(item)"
          (remove)="state.dataService.removeItem(item)"
          (moveDown)="state.dataService.moveItem(item, i, i + 1)"
          [item]="item"/>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .scrollable {
        overflow: auto;
        contain: strict;
        height: 100%;
      }

      .item {
        height: 90px;
        overflow: hidden;
        contain: unset;
      }

    `,
  ],
  standalone: true,
  providers: [DataService, DemoComponentState],
  imports: [
    ItemComponent,
    ListHeaderComponent,
    NgForOf,
    NgIf
  ]
})
export class DefaultComponent {
  constructor(public state: DemoComponentState) {
    state.dataService.items = state.dataService.items.slice(0, 500);
  }
}

