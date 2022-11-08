import { Injectable } from '@angular/core'; 
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined;
  //public userLocation?: [number, number];
  public isLoadingPLaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    //!  = no tiene ningun valor
    //!! = no hay un valor y lo niego (que sea true cuando SÍ tenga un valor)
    return !!this.userLocation;
  }

  constructor( private placesApiClient: PlacesApiClient,
               private MapService: MapService) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject)  => {
    
      navigator.geolocation.getCurrentPosition(
         ({ coords }) => {
          this.userLocation = [ coords.longitude, coords.latitude];
          resolve( this.userLocation )
        },
        (err) => {
          alert("Can't get GeoLocation");
          console.log(err);
          reject();
        }
      );

    });

  }

  getPlacesByQuery( query: string = ''){
    //evaluar cuando el query es nulo
    if (query.length === 0) {
      this.isLoadingPLaces = false;
      this.places = [];
      return;
    }


    if (!this.userLocation) throw Error('There is no userLocation');

      this.isLoadingPLaces = true;

    this.placesApiClient.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')

      }
    })
        .subscribe( resp => {
            //console.log(resp.features);

            this.isLoadingPLaces = false;
            this.places = resp.features;

            this.MapService.createMarkersFromPlaces( this.places, this.userLocation!);
        } );
  }

  deletePlaces(){
    this.places = [];
  }
}
