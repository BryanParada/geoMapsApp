import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html' 
})
export class MapScreenComponent {

  constructor( private placesService: PlacesService) { }
 
  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }

}
