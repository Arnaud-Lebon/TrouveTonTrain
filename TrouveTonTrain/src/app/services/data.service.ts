import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}
  saveJourney(body: any) {
    return this.httpClient
      .post('https://trouvetontrain-267507.firebaseio.com/journeys.json', body);
  }
  getSavedJourneys() {
    return this.httpClient
      .get('https://trouvetontrain-267507.firebaseio.com/journeys.json');
  }
}
