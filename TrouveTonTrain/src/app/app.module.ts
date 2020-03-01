import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HomeComponent } from './home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SncfService} from './services/sncf.service';
import {SoapService} from './services/soap.service';
import {DataService} from './services/data.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleJourneyComponent } from './single-journey/single-journey.component';
import {MatSelectModule} from '@angular/material/select';
import { SavedJourneysComponent } from './saved-journeys/saved-journeys.component';
import { SingleSavedComponent } from './single-saved/single-saved.component';

const appRoutes: Routes = [
  {path: 'saved', component: SavedJourneysComponent},
  {path: '', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingleJourneyComponent,
    SavedJourneysComponent,
    SingleSavedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    MatSelectModule
  ],
  providers: [
    SncfService,
    SoapService,
    DataService,
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
