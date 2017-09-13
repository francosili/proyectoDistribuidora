import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  getCategorias() {
    return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.categoria');
  }

  getArticulos(idVendedor?) {

    if (idVendedor) {
      return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.articulo/'+idVendedor);
    } else {
      return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.articulo');
    }

  }

}
