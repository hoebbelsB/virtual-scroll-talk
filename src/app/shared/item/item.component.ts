import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Item } from '../data.service';

@Component({
  selector: 'item',
  template: `
    <mat-checkbox (change)="checked = $event.checked"/>
    <div class="item__image">
      <img [src]="item.image" loading="eager"/>
    </div>
    <div class="item__user">{{ item.user }}</div>
    <div class="item__content">{{ item.content }}</div>
    <div>
      <mat-icon [color]="item.status === 'block' ? 'warn' : 'accent'" [matTooltip]="item.status">{{ item.status }}</mat-icon>
    </div>
    <div class="item__date">{{ item.date | date }}</div>
    <ng-content></ng-content>
    <div class="item__actions">
      <button mat-button color="primary" (click)="update.emit()"><mat-icon>update</mat-icon> Update</button>
      <button mat-button color="primary" (click)="moveDown.emit()"><mat-icon>move_down</mat-icon> Move Down</button>
      <button mat-button color="warn" (click)="remove.emit()"><mat-icon>delete</mat-icon> Remove</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'item'
  },
  styleUrls: ['./item.component.scss'],
  imports: [
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  standalone: true
})
export class ItemComponent {

  @HostBinding('class.checked') checked = false;

  @Input() item: Item;

  @Output() update = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
}
