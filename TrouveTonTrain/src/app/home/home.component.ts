import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import {SncfService} from '../services/sncf.service';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Place} from '../models/place.model';
import {DataService} from '../services/data.service';
import {SoapService} from '../services/soap.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataJourney: any;
  dataJourneySub: Subscription;
  today = new Date();
  fromP: Place;
  toP: Place;
  formGroup: FormGroup;
  optionsFrom: any;
  optionsTo: any;
  time: any;
  dateChoice: string;
  lengthTravel: string;
  costTravel: string;
  devises: any;
  selected: any;
  selectedView: any;
  dateSelected: any;
  constructor(private sncfService: SncfService, private soapService: SoapService) {
    this.dataJourneySub = this.sncfService.dataJourneySubject.subscribe(
      (data: any) => {
        this.dataJourney = data;
        console.log(this.dataJourney);
      }
    );
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      from: new FormControl('', [Validators.minLength(2), Validators.required]),
      to: new FormControl('', [Validators.minLength(2), Validators.required]),
      dateTime: new FormControl(this.today),
      time: new FormControl({
        hour: this.today.getHours(),
        minute: this.today.getMinutes()
      }, Validators.required)
    });
    this.devises = [
      {value: 'EUR', viewValue: '€'},
      {value: 'USD', viewValue: '$'},
      {value: 'AUD', viewValue: 'AU$'},
      {value: 'CAD', viewValue: '$CA'},
      {value: 'CNY', viewValue: '¥'},
      {value: 'PHP', viewValue: '₱'},
      {value: 'DKK', viewValue: 'kr'},
      {value: 'HUF', viewValue: 'Ft'},
      {value: 'CZK', viewValue: 'Kč'},
      {value: 'CHF', viewValue: 'CHF'}
    ];
    this.selected = this.devises[0].value;
  }
  onSubmit() {
    const data = this.formGroup.value;
    this.dateSelected = this.dateToString(this.formatDate(data.dateTime));
    data.from = data.from.trim();
    data.to = data.to.trim();
    data.from = data.from[0].toUpperCase() + data.from.slice(1);
    data.to = data.to[0].toUpperCase() + data.to.slice(1);
    data.dateTime.setHours(data.time.hour, data.time.minute);
    this.dateChoice = this.formatDate(data.dateTime);
    this.sncfService.placesRequest(data.from).subscribe((res: any) => {
      this.fromP = this.sncfService.getPlace(res, data.from);
      this.sncfService.placesRequest(data.to).subscribe((result: any) => {
        this.toP = this.sncfService.getPlace(result, data.to);
        this.sncfService.journeyRequest(this.fromP.id, this.toP.id, this.formatDate(data.dateTime));
        this.calcLength();
      });
    });
  }

  formatDate(str: string) {
    if (str !== '') {
      const date = new Date(str);
      return date.getFullYear().toString()
        + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1).toString()
        + (date.getDate() < 10 ? '0' : '') + date.getDate().toString()
        + 'T'
        + (date.getHours() < 10 ? '0' : '') + date.getHours().toString()
        + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes().toString()
        + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds().toString();
    }
  }
  calcLength() {
    let lat1 = parseFloat(this.fromP.lat);
    const lon1 = parseFloat(this.fromP.long);
    let lat2 = parseFloat(this.toP.lat);
    const lon2 = parseFloat(this.toP.long);
    const R = 6371; // km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.lengthTravel =  (R * c).toFixed(0);
    this.calcPrice();
  }

  toRad(Value) {
    return Value * Math.PI / 180;
  }
  getOptions(value: string, id: number) {
    if (value.trim().length > 1) {
      this.sncfService.getAdminPlace(value)
        .subscribe(data => {
          if (id === 1) {
            this.optionsFrom = data.map(val => val.administrative_region.name);
          } else {
            this.optionsTo = data.map(val => val.administrative_region.name);
          }
        });
    }
  }

  calcPrice() {
    this.selectedView = this.devises.filter(d => d.value === this.selected).map(d => d.viewValue);
    this.sncfService.priceCalcul(this.lengthTravel, this.selected).subscribe((response: number) => {
      this.costTravel = response.toFixed(2);
    });
  }
  dateToString(date: string) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai',
      'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const monthDate = date.substr(4, 2)[0] === '0' ? date.substr(4, 6)[1] : date.substr(4, 6);
    const month = months[parseInt(monthDate , 0) - 1];
    return date.substr(6, 2) + ' ' + month + ' ' + date.substr(0, 4);
  }
}
