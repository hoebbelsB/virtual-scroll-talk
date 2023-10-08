import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'blank',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DataService]
})
export class BlankComponent {}
