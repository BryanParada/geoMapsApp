import { Injectable } from '@angular/core'; 
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation: [number, number] | undefined;
  //public useLocation?: [number, number];
  public isLoadingPLaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    //!  = no tiene ningun valor
    //!! = no hay un valor y lo niego (que sea true cuando SÍ tenga un valor)
    return !!this.useLocation;
  }

  constructor( private placesApiClient: PlacesApiClient) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject)  => {
    
      navigator.geolocation.getCurrentPosition(
         ({ coords }) => {
          this.useLocation = [ coords.longitude, coords.latitude];
          resolve( this.useLocation )
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


    if (!this.useLocation) throw Error('There is no userLocation');

      this.isLoadingPLaces = true;

    this.placesApiClient.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation.join(',')

      }
    })
        .subscribe( resp => {
            //console.log(resp.features);

            this.isLoadingPLaces = false;
            this.places = resp.features;
        } );
  }
}
