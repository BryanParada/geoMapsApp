import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core'; 
import { PlacesService } from '../../services/places.service';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [
  ]
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor( private placesService: PlacesService) { }

  ngAfterViewInit(): void {

    if ( !this.placesService.useLocation ) throw Error('There is no placesService.userlocation')
   
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
      }); 
    
    
  }

}
