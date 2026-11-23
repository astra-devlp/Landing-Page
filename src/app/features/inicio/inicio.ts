import { Component } from '@angular/core';
import { Contacto } from './sections/contacto/contacto';
import { Empresa } from './sections/empresa/empresa';
import { Hero } from './sections/hero/hero';
import { Ia } from './sections/ia/ia';
import { Marquee } from './sections/marquee/marquee';
import { Preguntas } from './sections/preguntas/preguntas';
import { Proceso } from './sections/proceso/proceso';
import { Proyectos } from './sections/proyectos/proyectos';
import { Servicios } from './sections/servicios/servicios';
import { Showcase } from './sections/showcase/showcase';

@Component({
  selector: 'app-inicio',
  imports: [Hero, Marquee, Servicios, Showcase, Empresa, Ia, Proyectos, Proceso, Preguntas, Contacto],
  templateUrl: './inicio.html',
  styles: ``,
})
export class Inicio {}
