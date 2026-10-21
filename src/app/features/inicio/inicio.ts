import { Component } from '@angular/core';
import { Contacto } from './sections/contacto/contacto';
import { Hero } from './sections/hero/hero';
import { Ia } from './sections/ia/ia';
import { Preguntas } from './sections/preguntas/preguntas';
import { Proceso } from './sections/proceso/proceso';
import { Proyectos } from './sections/proyectos/proyectos';
import { Servicios } from './sections/servicios/servicios';

@Component({
  selector: 'app-inicio',
  imports: [Hero, Proyectos, Servicios, Ia, Proceso, Preguntas, Contacto],
  templateUrl: './inicio.html',
  styles: ``,
})
export class Inicio {}
