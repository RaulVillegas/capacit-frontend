import { Component, OnInit } from '@angular/core';
import { EnvioService } from '../../../servicios/envio/envio.service';
import { Envio } from '../../../models/envio/envio';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-actualizar-envio',
  templateUrl: './actualizar-envio.component.html',
  styleUrls: ['./actualizar-envio.component.css']
})
export class ActualizarEnvioComponent implements OnInit {

  envio : Envio = new Envio();
  constructor(private envioServicio:EnvioService, private router:Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerEnvioPorId(this.rutaActiva.snapshot.params.id);
  }

  private obtenerEnvioPorId(id:number) {
    this.envioServicio.obtenerEnvioPorId(id).subscribe(dato => {
      this.envio = dato;
      console.log(this.envio.id);
    });
  }

  irALaListaDeEnvios() {
    this.router.navigate(['/lista-envios']);
  }

  actualizarEnvio() {
    this.envioServicio.actualizarEnvio(this.envio.id,this.envio).subscribe(dato => {
      console.log(dato);    
      this.irALaListaDeEnvios();
  }, error => console.log(error));
  }

  onSubmit() {
    this.actualizarEnvio();
  }
}

