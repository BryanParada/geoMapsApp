import { Injectable, resolveForwardRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation: [number, number] | undefined;
  //public useLocation?: [number, number];

  get isUserLocationReady(): boolean {
    //!  = no tiene ningun valor
    //!! = no hay un valor y lo niego (que sea true cuando SÍ tenga un valor)
    return !!this.useLocation;
  }

  constructor() {
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
}
