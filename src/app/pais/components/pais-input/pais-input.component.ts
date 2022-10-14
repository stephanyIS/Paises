import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() onEnter    :EventEmitter<string> = new EventEmitter();
  @Output() onDebounce :EventEmitter<string> = new EventEmitter();

  deboucer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(){
    this.deboucer
      .pipe( debounceTime(300) )
      .subscribe( valor => {
        //console.log('debonce',valor);
        this.onDebounce.emit(valor);
      } )
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    //console.log('tecla presionada');
    this.deboucer.next(this.termino);
  }

}
