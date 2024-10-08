import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AtomsModule } from './components/atoms/atoms.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { PagesModule } from './components/pages/pages.module';
import { CategoryService } from '@services/category/category.service';
import { OrganismsModule } from './components/organisms/organisms.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    ReactiveFormsModule, 
    PagesModule
  ],
  exports: [AtomsModule],
  providers: [CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule { }
