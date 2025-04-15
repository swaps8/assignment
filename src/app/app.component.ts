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
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  tripForm!: FormGroup;
  addressSource: any;
  final: any;
  trips: any[] = [];
  finalResponse: any [] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      startPoint: ["", Validators.required],
      endPoint: ["", Validators.required]
    });
  //   this.finalResponse= [
  //     {
  //         "startPoint": "CHE",
  //         "endPoint": "OOT",
  //         "level": "level-1"
  //     },
  //     {
  //         "startPoint": "OOT",
  //         "endPoint": "BAN",
  //         "level": "level-1"
  //     },
  //     {
  //         "startPoint": "MUM",
  //         "endPoint": "PUN",
  //         "level": "level-1 arrow"
  //     },
  //     {
  //         "startPoint": "MUM",
  //         "endPoint": "DEL",
  //         "level": "level-2"
  //     },
  //     {
  //         "startPoint": "MUM",
  //         "endPoint": "DEL",
  //         "level": "level-2"
  //     }
  // ]
    console.log(this.finalResponse);
    
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
    const prevTrip = this.trips[this.trips.length - 2];
  
    if (prevTrip) {
      const isContinued = prevTrip.endPoint === trip.startPoint;
      const isSameRoute = prevTrip.startPoint === trip.startPoint && prevTrip.endPoint === trip.endPoint;
      const isBackToStart = prevTrip.endPoint != trip.startPoint;
  
      if (isSameRoute) {
        level = 'level-2';
  
        // Find previous occurrence in finalResponse and update
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
  
  console.log(this.finalResponse);
  
  this.tripForm.patchValue({
    startPoint: '',
    endPoint: ''
  });
  
}




  // addTrip(): void {
  //   const trip: Trip = this.tripForm?.value;
    
  //   this.trips?.push(trip);

  // if(this.trips?.length > 1){
  //   const lastTrip = this.trips[this.trips?.length - 2];
  
  //   if (lastTrip) {
  //     const isContinued = lastTrip.endPoint === trip.startPoint;
  //     const isSamePickupDrop = lastTrip.startPoint === trip.startPoint && lastTrip.endPoint === trip.endPoint;
  //     this.final = isSamePickupDrop ? 'level-2' : (isContinued ? 'level-1' : 'level-1 arrow');
  //     this.trips = this.trips.map((trip, index) => {
  //       return {
  //         ...trip,
  //         level: index === 0 ? 'level-1' :this.final
  //       };
  //     });
  //   } else {

  //     this.final = 'level-1';
  //   }
  // }
  //   else {
  //     this.final = 'level-1';
  //   }

  //   this.finalResponse.push({
  //     startPoint: trip.startPoint,
  //     endPoint: trip.endPoint,
  //     level: this.final
  //   });
   
  //   this.tripForm.patchValue({
  //     startPoint: '',
  //     endPoint: ''
  //   });
  // }

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
