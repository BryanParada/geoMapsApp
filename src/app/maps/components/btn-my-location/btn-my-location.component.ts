import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styles: [
    `
    button{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
    `
  ]
})
export class BtnMyLocationComponent  {

  constructor( private mapService: MapService,
               private placesService: PlacesService) { }
 
  goToMyLocation(){

    if ( !this.placesService.isUserLocationReady ) throw Error('There is no location from the user')
    if ( !this.mapService.isMapReady ) throw Error('There is no map available')

    this.mapService.flyTo( this.placesService.useLocation! );
    
  }


}
