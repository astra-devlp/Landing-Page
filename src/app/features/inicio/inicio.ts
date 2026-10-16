import { Component } from '@angular/core';
import { About } from './sections/about/about';
import { Calculadora } from './sections/calculadora/calculadora';
import { Contacto } from './sections/contacto/contacto';
import { Cotizador } from './sections/cotizador/cotizador';
import { CtaFinal } from './sections/cta-final/cta-final';
import { Hero } from './sections/hero/hero';
import { Ia } from './sections/ia/ia';
import { Preguntas } from './sections/preguntas/preguntas';
import { Proceso } from './sections/proceso/proceso';
import { Proyectos } from './sections/proyectos/proyectos';
import { Sectores } from './sections/sectores/sectores';
import { Servicios } from './sections/servicios/servicios';

@Component({
  selector: 'app-inicio',
  imports: [
    Hero,
    Servicios,
    Cotizador,
    Sectores,
    Ia,
    Calculadora,
    Proceso,
    Proyectos,
    About,
    CtaFinal,
    Preguntas,
    Contacto,
  ],
  templateUrl: './inicio.html',
  styles: ``,
})
export class Inicio {}
