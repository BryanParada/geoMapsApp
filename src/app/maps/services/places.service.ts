import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlacesResponse, Feature } from '../interfaces/places';

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

  constructor( private http: HttpClient) {
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

      this.isLoadingPLaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-70.68505137276165%2C-33.49368887703039&types=place%2Cpostcode%2Caddress&language=es%2Cen&access_token=pk.eyJ1IjoiYnJ5YW4tcGMiLCJhIjoiY2w5c2h6YWZyMWgzYjNwb3V5cGpqZjgwayJ9.0iK7Q8561icC-ylAW9YGFQ`)
        .subscribe( resp => {
            console.log(resp.features);
            
            this.isLoadingPLaces = false;
            this.places = resp.features;
        } );
  }
}
