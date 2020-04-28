import { Injectable } from '@angular/core';
import { RenaperResponse } from '../models/renaper-response';
import { throwError, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RenaperMockService {

  constructor() { }

  get(dni: number) {
    const response = new RenaperResponse();
    const seconds = new Date().getSeconds();
    // entre los segundos 10 y 15 hago como que hubo un error en el servidor
    if (seconds >= 10 && seconds <= 15) {
      return throwError({ status: 500, error: { mensaje: 'Internal Server Error' } });
    } else {
      if (dni) {
        switch (dni) {
          case 33089746:
            response.apellido = 'Laurenza';
            response.nombres = 'Lorena';
            response.fechaNacimiento = '24/09/1985';
            response.mensaje = 'ok';
            break;

          default:
            response.mensaje = 'No se encontró el dni';
            break;
        }

        if (response.apellido !== '') {
          return of(new HttpResponse({ status: 200, body: response }));
        } else {
          return throwError({ status: 400, error: { mensaje: response.mensaje } });
        }

      } else {
        return throwError({ status: 400, error: { mensaje: 'El campo dni es obligatorio' } });
      }
    }
  }
}
