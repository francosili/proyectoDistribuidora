import { ViewController  } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'modal-map',
  templateUrl: 'map.html'
})
export class MapModal {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(
        public viewCtrl: ViewController,
        public geolocation: Geolocation
    ) { }


    ionViewDidLoad() {
        this.loadMap();
    }

    // TODO: Setear real ubicación negocio
    loadMap() {

        let latLng = new google.maps.LatLng(-34.9290, 138.6010);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
