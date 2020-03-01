import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Journey} from '../models/journey.model';
import {DateModel} from '../models/date.model';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-single-journey',
  templateUrl: './single-journey.component.html',
  styleUrls: ['./single-journey.component.css']
})
export class SingleJourneyComponent implements OnInit, OnChanges {
  @Input() journey: any;
  @Input() lengthTravel: any;
  @Input() dateChoice: string;
  journeyList: Journey[] = [];
  totalDuration: any;
  constructor(private dataService: DataService) { }
  ngOnChanges() {
    if (this.journey) {
      this.dateChoice = this.dateToString(this.dateChoice);
      this.journeyList = [];
      this.journey.forEach(j => {
        this.journeyList.push(new Journey(j.from.stop_point,
          j.to.stop_point,
          new DateModel(
            this.dateToString(j.departure_date_time),
            this.timeToString(j.departure_date_time)),
          new DateModel(
            this.dateToString(j.arrival_date_time),
            this.timeToString(j.arrival_date_time)),
          false,
          this.lengthTravel,
          this.secondesToTime(j.duration),
          j.duration,
          ''));
      });
      this.totalDuration = this.calcDurationTotal(this.journey);
    }
  }
  ngOnInit(): void {
  }

  dateToString(date: string) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai',
      'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const monthDate = date.substr(4, 2)[0] === '0' ? date.substr(4, 6)[1] : date.substr(4, 6);
    const month = months[parseInt(monthDate , 0) - 1];
    return date.substr(6, 2) + ' ' + month + ' ' + date.substr(0, 4);
  }
  timeToString(date: string) {
    return date.substr(9, 2) + 'h' + date.substr(11, 2);
  }
  saveJourney(journey: any) {
    this.dataService.saveJourney(journey)
      .subscribe(response => {
        journey.saved = true;
      });
  }
  secondesToTime(totalSeconds: number) {
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);

    let result = (hours < 10 ? '0' + hours : hours);
    result += 'H' + (minutes < 10 ? '0' + minutes : minutes);
    return result;
  }

  calcDurationTotal(journey: any) {
    let totalSeconds = 0;
    journey.forEach((j: Journey) => {
      totalSeconds += j.duration;
    });
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);

    let result = (hours < 10 ? '0' + hours : hours);
    result += 'H' + (minutes < 10 ? '0' + minutes : minutes);
    this.journeyList[0].totalDuration = result;
    return result;

  }
}
