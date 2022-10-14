import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    ` li {
        cursor: pointer;
      }`
  ]


  
})
export class PorPaisComponent implements OnInit {

  termino: string = "";
  hayError: boolean= false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  placeholder: string = 'Buscar país...';
  mostrarSugerencia: boolean = false;

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){
    this.mostrarSugerencia = false;
    this.hayError = false;
    this.termino= termino;
    
    this.paisService.buscarPais( this.termino )
      .subscribe( (paises) => {
          console.log(paises);
          this.paises = paises;
       }, (err) => {
          this.hayError = true;
          this.paises = [];
       })
  }

  sugerencias( termino:string ){
    this.mostrarSugerencia = true;
    console.log(termino, ' en sugerencias')
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino)
          .subscribe( paises => this.paisesSugeridos = paises.splice(0,5),
                      err=>{
                        this.paisesSugeridos = []
                      });
  }

  buscarSugerido( termino: string ){
      this.buscar( termino );
  }

}
