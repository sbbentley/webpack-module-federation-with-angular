import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { withCustomEventsPublishedToEventBus } from './with-custom-events-published-to-event-bus';
import { Mfe1Component } from './mfe1-component/mfe1.component';
import { OtherComponent } from './other-component/other.component';

@NgModule({
  declarations: [
    AppComponent,
    Mfe1Component,
    OtherComponent
  ],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    withCustomEventsPublishedToEventBus(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
