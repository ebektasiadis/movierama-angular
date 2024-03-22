import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MagnifyingGlassSvgComponent } from './shared/svg/magnifying-glass-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MagnifyingGlassSvgComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
