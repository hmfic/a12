import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	lat: number = 51.678418;
	lng: number = 7.809007;

	sensors = [
		{
			"name":"Equinix SJ",
			"descr":"Secure cage Cisco 2550, rack 16",
			"lat":"37.380186",
			"lon":"-121.997724",
			"url":"/assets/icon38.png"
		},
		{
			"name":"Equinix Dallas",
			"descr":"Opendaylight instance",
			"lat":"32.801539",
			"lon":"-96.819523",
			"url":"/assets/icon38.png"
		},
		{
			"name":"London",
			"descr":"Docker instance for PROD",
			"lat":"51.533826",
			"lon":"-.257974",
			"url":"/assets/icon38.png"
		}];

	destinations = [
		{
			"name":"High risk destination - NK",
			"lat":"39.041084",
			"lon":"125.762729",
			"url":"/assets/archive.svg"
		},
		{
			"name":"High risk destination - Shanghai",
			"lat":"31.245494",
			"lon":"121.247622",
			"url":"/assets/archive.svg"
		},
		{
			"name":"High risk destination - Bucharest",
			"lat":"44.431771",
			"lon":"26.094622",
			"url":"/assets/archive.svg"
		},
		{
			"name":"High risk destination - Guadalajara",
			"lat":"20.659635",
			"lon":"-103.349153",
			"url":"/assets/archive.svg"
		}]

  constructor(
  	private globals: Globals
  		) { }

  ngOnInit() {
  }

  onMouseOver(infoWindow, gm) {
  	console.log("map.component.ts; in mouseover; gm=",gm);
        if (gm.lastOpen != null) {
            gm.lastOpen.close();
        }
        console.log("opening window");
        gm.lastOpen = infoWindow;
        infoWindow.open();
    } 

    onMouseOut(infoWindow,gm) {
    	infoWindow.close();
    }

}


/*

*/