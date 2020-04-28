import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RenaperMockService } from './mock/renaper-mock.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormularioComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule

  ],
  providers: [RenaperMockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
