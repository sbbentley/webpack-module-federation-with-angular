import { Component, EventEmitter, Input, Output, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-my-standalone-component',
    templateUrl: './my-standalone-component.component.html',
    styleUrls: ['./my-standalone-component.component.css']
})
export class MyStandaloneComponent {
  public readonly version = VERSION.full;

  @Input()
  public inputText?: string;

  @Output("message-sent")
  public messageSentEvent: EventEmitter<string> = new EventEmitter<string>();

  public sendMessage(): void {
    this.messageSentEvent.emit(`message sent from MyStandaloneComponent loaded from the mfe1 app at ${new Date()}`);
  }
}
