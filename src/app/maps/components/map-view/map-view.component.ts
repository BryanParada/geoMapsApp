import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core'; 
import { PlacesService, MapService } from '../../services/';
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

  constructor( private placesService: PlacesService,
               private mapService: MapService) { }

  ngAfterViewInit(): void {

    if ( !this.placesService.userLocation ) throw Error('There is no placesService.userlocation')
   
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
      }); 

    const popup = new mapboxgl.Popup()
        .setHTML(`
        <h6>Here i am</h6>
        <span>I am right here!</span>
        `);

    new mapboxgl.Marker({color: 'red'})
        .setLngLat( this.placesService.userLocation)
        .setPopup( popup )
        .addTo(map)

    this.mapService.setMap(map);
    
    
  }

}
