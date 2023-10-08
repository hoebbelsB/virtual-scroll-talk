import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'virtual-scroll-root',
  },
})
export class AppComponent {

  navOpen = false;
  constructor(router: Router) {
    matchMedia('(max-width: 600px)').addEventListener(
      'change',
      (e: MediaQueryListEvent) => {
        if (e.matches) {
          this.navOpen = false;
        }
      }
    );
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.navOpen = false;
      }
    });
  }

  closeNavIfOpen(event: MouseEvent) {
    if (this.navOpen) {
      event.stopPropagation();
      event.preventDefault();
      this.navOpen = false;
    }
  }
}
