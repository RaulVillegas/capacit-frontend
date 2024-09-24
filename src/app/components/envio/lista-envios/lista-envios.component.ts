import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EnvioService } from '../../../servicios/envio/envio.service';
import { Envio} from '../../../models/envio/envio'; //se importa la clase envio
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-envios',
  templateUrl: './lista-envios.component.html',
  styleUrls: ['./lista-envios.component.css']
})
export class ListaEnviosComponent implements OnInit {

  envio:Envio[]; //se crea el arreglo envio para enlistar envios
  paginatedEnvios: Envio[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 5; 
  totalItems: number = 0; 
  constructor(private envioServicio: EnvioService, private router:Router) { }

  ngOnInit(): void { 
    this.obtenerEnvios();
  }

  //Este metodo manda a llamar al servicio e inicializa el arreglo con los datos
  private obtenerEnvios() {
    this.envioServicio.obtenerListaDeEnvios().subscribe(dato => {
      this.envio = dato;
      this.totalItems = dato.length; 
      this.updatePaginatedEnvios(); 
    });
  }

  private updatePaginatedEnvios() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEnvios = this.envio.slice(start, end); 
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.updatePaginatedEnvios(); 
  }

  actualizarEnvio(id:number) {
    this.router.navigate(['actualizar-envio',id]);
  }

  eliminarEnvio(id:number) {
    swal({
      title : "¿Estás seguro?",
      text : "Confirma si deseas eliminar el envio",
      type : "warning",
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : "Si, eliminalo",
      cancelButtonText : "No, cancelar",
      confirmButtonClass : "btn btn-success",
      cancelButtonClass : "btn btn-danger",
      buttonsStyling : true
    }).then((result) => {
      if (result.value) {
        this.envioServicio.eliminarEnvio(id).subscribe(dato => {
          console.log(dato);
          this.obtenerEnvios();
          swal(
            'Envio eliminado',
            'El envio ha sido eliminado con éxito',
            'success'
          )
        });
      }
    })


  }

  verDetallesEnvio(id:number) {
    this.router.navigate(['detalle-envio',id]);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}

/*import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EnvioService } from '../../../servicios/envio/envio.service';
import { Envio } from '../../../models/envio/envio'; 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-envios',
  templateUrl: './lista-envios.component.html',
  styleUrls: ['./lista-envios.component.css']
})
export class ListaEnviosComponent implements OnInit {
  envio: Envio[] = []; 
  paginatedEnvios: Envio[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 5; 
  totalItems: number = 0; 

  constructor(private envioServicio: EnvioService, private router: Router) {}

  ngOnInit(): void { 
    this.obtenerEnvios();
  }

  private obtenerEnvios() {
    this.envioServicio.obtenerListaDeEnvios().subscribe(dato => {
      this.envio = dato;
      this.totalItems = dato.length; 
      this.updatePaginatedEnvios(); 
    });
  }

  private updatePaginatedEnvios() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEnvios = this.envio.slice(start, end); 
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.updatePaginatedEnvios(); 
  }

  actualizarEnvio(id: number) {
    this.router.navigate(['actualizar-envio', id]);
  }

  eliminarEnvio(id: number) {
    swal({
      title: "¿Estás seguro?",
      text: "Confirma si deseas eliminar el envio",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.envioServicio.eliminarEnvio(id).subscribe(() => {
          this.obtenerEnvios();
          swal("Envio eliminado", "El envio ha sido eliminado con éxito", "success");
        });
      }
    });
  }

  verDetallesEnvio(id: number) {
    this.router.navigate(['detalle-envio', id]);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
} */
