import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';

import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Pais;

  constructor( private activatedRoute:ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    /* //Forma 1 
    this.activatedRoute.params.subscribe( ({ id }) => {
        console.log(id);
        this.paisService.getPaisPorAlpha(id).subscribe( pais => {
          console.log(pais);
        })
    });
    */

    //Forma 2 
    this.activatedRoute.params 
      .pipe( 
        switchMap( ( {id})=> this.paisService.getPaisPorAlpha(id)),
        tap( console.log)
      )
      .subscribe( pais => {
        this.pais = pais;
      })
  }
}
