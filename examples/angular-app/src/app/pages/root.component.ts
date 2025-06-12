import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root-component',
  template: '<router-outlet />',
  imports: [RouterOutlet],
  standalone: true,
})
export class RootComponent {}
