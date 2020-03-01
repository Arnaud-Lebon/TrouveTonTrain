import {DateModel} from './date.model';

export class Journey {
  constructor(
    public from: any,
    public to: any,
    public departDate: DateModel,
    public arrivalDate: DateModel,
    public saved = false,
    public distance: any,
    public duration: any,
    public durationSeconde: number,
    public totalDuration: any
  ) {}
}
