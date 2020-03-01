import {DateModel} from './date.model';

export class SavedModel {
  constructor(
    public from: any,
    public to: any,
    public departDate: DateModel,
    public arrivalDate: DateModel,
    public lengthTravel: any,
    public duration: any
  ) {}
}
