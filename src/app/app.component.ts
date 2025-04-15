import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Trip {
  startPoint: string;
  endPoint: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'assignment';
  tripForm!: FormGroup;
  addressSource: any;
  final: any;
  trips: any[] = [];
  finalResponse: any[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      startPoint: ["", Validators.required],
      endPoint: ["", Validators.required]
    });
    this.addressSource = this.address;
  }

  startPointValueChange(event: any) {
    this.addressSource = this.address;
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.tripForm.patchValue({
      endPoint: ''
    });
    this.addressSource = this.addressSource.filter((city: any) => city?.value !== selectedValue);
  }


  addTrip(): void {
    const trip: Trip = this.tripForm?.value;
    this.trips?.push(trip);
    let level = 'level-1';
    if (this.trips?.length > 1) {
      const prevTrip = this.trips[this.trips?.length - 2];
      if (prevTrip) {
        const isContinued = prevTrip.endPoint === trip.startPoint;
        const isSameRoute = prevTrip.startPoint === trip.startPoint && prevTrip.endPoint === trip.endPoint;
        const isBackToStart = prevTrip.endPoint != trip.startPoint;
        if (isSameRoute) {
          level = 'level-2';
          const prevMatchIndex = this.finalResponse.findIndex(
            item => item.startPoint === trip.startPoint && item.endPoint === trip.endPoint
          );
          if (prevMatchIndex !== -1) {
            this.finalResponse[prevMatchIndex].level = 'level-2';
          }
        } else if (isContinued) {
          level = 'level-1';
        } else if (isBackToStart) {
          level = 'level-1 arrow';
        }
      }
    }

    this.finalResponse.push({
      startPoint: trip.startPoint,
      endPoint: trip.endPoint,
      level: level
    });

    this.tripForm.patchValue({
      startPoint: '',
      endPoint: ''
    });
  }


  public address = [
    { 'value': 'BAN', 'name': 'Bangalore' },
    { 'value': 'CHE', 'name': 'Chennai' },
    { 'value': 'OOT', 'name': 'Ooty' },
    { 'value': 'HYD', 'name': 'Hyderabad' },
    { 'value': 'MUM', 'name': 'Mumbai' },
    { 'value': 'PUN', 'name': 'Pune' },
    { 'value': 'DEL', 'name': 'Delhi' },
  ]

}
