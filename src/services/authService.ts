import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

<<<<<<< HEAD
  getCategorias(idVendedor?) {
    return this.http.get('http://10.0.0.3:8080/ApiDistribuidora/webresources/entidades.categoria/' + idVendedor);
=======
  getCategorias() {
    return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.categoria/todos');
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef
  }

  getArticulos(idVendedor?) {

    if (idVendedor) {
      return this.http.get('http://10.0.0.3:8080/ApiDistribuidora/webresources/entidades.articulo/'+idVendedor);
    } else {
      return this.http.get('http://10.0.0.3:8080/ApiDistribuidora/webresources/entidades.articulo');
    }

  }

<<<<<<< HEAD
  // getCantidadCategoria(idCategoria){
  //   return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.categoria/' + idCategoria);
  // }
=======
  getCantidadCategoria(idCategoria){
    return this.http.get('http://192.168.0.100:8080/DistribuidoraApi/webresources/entidades.categoria/' + idCategoria);
  }
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef

}
