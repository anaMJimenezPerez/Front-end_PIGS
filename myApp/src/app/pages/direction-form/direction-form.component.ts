import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direction-form',
  templateUrl: './direction-form.component.html',
  styleUrls: ['./direction-form.component.css']
})
export class DirectionFormComponent {
  constructor(private router: Router) {}

  navigateToDirectionFormPage() {
    this.router.navigateByUrl('');
  }
}
