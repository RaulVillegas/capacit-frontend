import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Envio} from '../../models/envio/envio'; //se importa la clase envio
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  private baseURL = "http://localhost:8080/api/v1/envios"

  constructor(private httpClient : HttpClient) { }

  //Este metodo sirve para obtener los envios
  obtenerListaDeEnvios():Observable<Envio[]>{
    return this.httpClient.get<Envio[]>(`${this.baseURL}`);
  }

  actualizarEnvio(id:number, envio:Envio) : Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, envio);
  }

  obtenerEnvioPorId(id:number):Observable<Envio> {
    return this.httpClient.get<Envio>(`${this.baseURL}/buscarPorId/${id}`);
  }

  eliminarEnvio(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  
}
