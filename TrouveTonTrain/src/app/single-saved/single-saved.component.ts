import {Component, Input, OnInit} from '@angular/core';
import {SavedModel} from '../models/saved.model';
import {SncfService} from '../services/sncf.service';

@Component({
  selector: 'app-single-saved',
  templateUrl: './single-saved.component.html',
  styleUrls: ['./single-saved.component.css']
})
export class SingleSavedComponent implements OnInit {
  @Input() journey: SavedModel;
  selected: any;
  costTravel: any;
  devises: any;
  selectedView: any;
  constructor(private sncfService: SncfService) { }

  ngOnInit(): void {
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
    this.calcPrice();
  }
  calcPrice() {
    this.selectedView = this.devises.filter(d => d.value === this.selected).map(d => d.viewValue);
    this.sncfService.priceCalcul(this.journey.lengthTravel, this.selected).subscribe((response: number) => {
      this.costTravel = response.toFixed(2);
    });
  }
}
