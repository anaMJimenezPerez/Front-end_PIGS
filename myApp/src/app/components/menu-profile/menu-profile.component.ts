import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent {

  currentPath: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Listen to navigation termination events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // This method uses the 'url' property of the ActivatedRoute to get the current route. 
      this.currentPath = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    });
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
} 