import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  getProductos() {
    return this.http.get('http://192.168.0.100:47264/DistribuidoraRest/webresources/entidades.producto');
  }

   getCategorias() {
    return this.http.get('http://192.168.0.100:47264/DistribuidoraRest/webresources/entidades.categoria');
  }

}
