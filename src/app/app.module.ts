import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {ControlsComponent} from './controls/controls.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {PhotosComponent} from './photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    ProfilesComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
