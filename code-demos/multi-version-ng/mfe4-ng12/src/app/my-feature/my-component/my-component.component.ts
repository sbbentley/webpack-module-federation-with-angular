import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'mfe4-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  version = VERSION.full;
}
