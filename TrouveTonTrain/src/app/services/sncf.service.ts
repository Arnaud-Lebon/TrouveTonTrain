import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Place} from '../models/place.model';
import {map} from 'rxjs/operators';

@Injectable()
export class SncfService {
  private sncfToken = 'bff32498-1a27-4551-a611-0411949cdba6';
  private dataJourney: any;
  dataJourneySubject = new Subject<any>();
  constructor(private httpClient: HttpClient) {}

  emitDataJourneySubject() {
    this.dataJourneySubject.next(this.dataJourney);
  }
  getPlace(data: any, placeName) {
    const place = data.places.find(p => p.administrative_region.name === placeName);
    return new Place(
      placeName,
      place.administrative_region.id,
      place.administrative_region.coord.lat,
      place.administrative_region.coord.lon);
  }
  getAdminPlace(name: string) {
    return this.placesRequest(name)
      .pipe(map((response: any) => response.places.filter(
        (item: any) => item.embedded_type === 'administrative_region'
        ))
      );
  }
  journeyRequest(f: string, t: string, dt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.sncfToken
      }),
      params: {from: f, to: t, datetime: dt, min_nb_journeys : '10' , datetime_represents : 'departure'}
    };
    this.httpClient
      .get('https://api.sncf.com/v1/coverage/sncf/journeys',
        httpOptions)
      .pipe(
        map((response: any) =>
          response.journeys
            .map(j => j.sections.filter((sec: any) => sec.type === 'public_transport'))
        )
      )
      .subscribe(
        (response: any) => {
          this.dataJourney = response;
          this.emitDataJourneySubject();
        },
        (error) => {
          console.log('error' + error);
        }
      );
  }
  placesRequest(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.sncfToken
      }),
      params: {q: name}
    };
    return this.httpClient
      .get('https://api.sncf.com/v1/coverage/sncf/places',
        httpOptions);
  }
  priceCalcul(dist: string, symbol: string) {
    const httpOptions = {
      params: {distance: dist, symbol}
    };
    return this.httpClient
      .get('https://prixservice-3r2xmf6xrq-ew.a.run.app/', httpOptions);
  }

}
