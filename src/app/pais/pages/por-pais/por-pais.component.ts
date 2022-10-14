import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: []
})
export class PorPaisComponent implements OnInit {

  termino: string = "";
  hayError: boolean= false;
  paises: Pais[] = [];
  placeholder: string = 'Buscar país...'

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){
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
    console.log(termino, ' en sugerencias')
    this.hayError = false;
  }

}
