import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  getCategorias(idVendedor?) {
    return this.http.get('http://10.0.0.3:8080/ApiDistribuidora/webresources/entidades.categoria/' + idVendedor);
  }

  getArticulos(idVendedor?) {

    if (idVendedor) {
      return this.http.get('http://10.0.0.3:8080/ApiDistribuidora/webresources/entidades.articulo/'+idVendedor);
    } else {
      return this.http.get('http://10.0.0.3:8080/ApiDistribuidora/webresources/entidades.articulo');
    }

  }

  // getCantidadCategoria(idCategoria){
  //   return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.categoria/' + idCategoria);
  // }

}
