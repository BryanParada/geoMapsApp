import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-logo',
  templateUrl: './angular-logo.component.html',
  styles: [
    `
    img{
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 75px;
      height: 75px;
      z-index: 999;
    }
  `
  ]
})
export class AngularLogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
