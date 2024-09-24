import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Envio } from '../../../models/envio/envio';
import { ActivatedRoute } from '@angular/router';
import { EnvioService } from '../../../servicios/envio/envio.service';

@Component({
  selector: 'app-detalle-envio',
  templateUrl: './detalle-envio.component.html',
  styleUrls: ['./detalle-envio.component.css']
})
export class DetalleEnvioComponent implements OnInit {
  
  id:number;
  envios:Envio;

  constructor(private route:ActivatedRoute, private envioServicio:EnvioService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.envios = new Envio();
    this.envioServicio.obtenerEnvioPorId(this.id).subscribe(dato => {
      this.envios = dato;
      swal(`Detalles del envío ${this.envios.id}`);
    });
  }

}
