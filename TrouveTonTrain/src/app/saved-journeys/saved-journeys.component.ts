import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Journey} from '../models/journey.model';
import {SavedModel} from '../models/saved.model';
import {DateModel} from '../models/date.model';
import {SncfService} from '../services/sncf.service';

@Component({
  selector: 'app-saved-journeys',
  templateUrl: './saved-journeys.component.html',
  styleUrls: ['./saved-journeys.component.css']
})
export class SavedJourneysComponent implements OnInit {
  journeys = [];
  constructor(private dataService: DataService, private sncfService: SncfService) { }

  ngOnInit(): void {
    this.dataService.getSavedJourneys()
      .subscribe((response: Journey) => {
        Object.values(response).forEach(j => {
          this.journeys.push(new SavedModel(
            j[0].from.name,
            j[j.length - 1].to.name,
            j[0].departDate,
            j[0].arrivalDate,
            j[0].distance,
            j[0].totalDuration));
        });
      });
  }
}
