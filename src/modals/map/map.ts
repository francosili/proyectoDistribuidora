import { ViewController  } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'modal-map',
  templateUrl: 'map.html'
})
export class MapModal {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(
        public viewCtrl: ViewController
    ) { }


    ionViewDidLoad() {
        // this.loadMap();
    }

    // TODO: Setear real ubicación negocio
    loadMap() {

        let latLng = new google.maps.LatLng(-32.628347, -60.147488);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        let marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: 'Distribuidora!'
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
