import { Component, OnInit } from '@angular/core';
import { EmpleadoSector } from 'src/app/models/empleado-sector';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RenaperResponse } from 'src/app/models/renaper-response';
import { HttpResponse } from '@angular/common/http';
import { RenaperMockService } from 'src/app/mock/renaper-mock.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
// arrays para hacer el "visita a" y el "sector"
export class FormularioComponent implements OnInit {
  empleadosConSector: Array<EmpleadoSector> = [
    new EmpleadoSector('Daniel', 'de Almeida', 'DGTAD - Legal y técnica'),
    new EmpleadoSector('Dario', 'Riva', 'DGCL - Legales'),
    new EmpleadoSector('Diego', 'Pellegrini', 'DGCL - Legales'),
    new EmpleadoSector('Federico', 'Musso', 'DGCCON - Normativa'),
    new EmpleadoSector('Laura', 'Rodriguez', 'MGEYA - Mesa de entradas'),
    new EmpleadoSector('Lautaro Ariel', 'Basanta', 'DGPRTGD - Proyectos tecnológicos'),
    new EmpleadoSector('Manuel', 'Castello', 'DGEGRAL - Escribanía'),
    new EmpleadoSector('Paula', 'Barrios', 'UAI - Auditoria'),
    new EmpleadoSector('Rocio', 'Diaz', 'SECLYT - Secretaria legal y técnica'),
    new EmpleadoSector('Sebastian', 'Parasis', 'UAI - Auditoria'),
    new EmpleadoSector('Walter', 'Marcote', 'DGEGRAL - Escribanía'),
    new EmpleadoSector('Gurillemo', 'Balcarcel', 'DGCCON - Normativa'),
    new EmpleadoSector('Esteban', 'Gawron', 'DGPRTGD - Proyectos tecnológicos'),
    new EmpleadoSector('Enzo', 'Peddini', 'DGPRTGD - Proyectos tecnológicos'),
    new EmpleadoSector('Andrea', 'Russo', 'UAI - Auditoria'),
    new EmpleadoSector('Adrian', 'Zarate', 'DGTAD - Legal y técnica'),
    new EmpleadoSector('Melisa', 'Yune', 'DGTAD - Legal y técnica'),
    new EmpleadoSector('Nicolas', 'Russmann', 'SECLYT - Secretaria legal y técnica'),
    new EmpleadoSector('Galo', 'Trillo', 'SECLYT - Secretaria legal y técnica'),
    new EmpleadoSector('Diego', 'Pellegrini', 'DGCCON - Normativa'),
  ];
  sectores = new Array<string>();
  dniForm: FormGroup;
  nombreApellidoIngreso: string;
  seEnvioDni = false;
  ingresoForm: FormGroup;
  seEnvioIngresar = false;
  hoy = new Date();

  constructor(private formBuilder: FormBuilder,private renaperMockService: RenaperMockService) { }

  ngOnInit() {
    // aca tengo que hacer que el dni se haga obligatorio
    this.dniForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000), Validators.max(99999999)]],
    });
    // aca tengo que hacer que nroTarjeta,visitaA y sector sean obligatorios
    this.ingresoForm = this.formBuilder.group({
      nroTarjeta: ['', [Validators.required, Validators.min(1), Validators.max(99999999)]],
      visitaA: ['', Validators.required],
      sector: ['', Validators.required],
    });
    // esto es para que el sector de algunos no se repita
    this.empleadosConSector.forEach(empleadoConSector => {
      const sectorOriginal = empleadoConSector.sector;
      const yaExiste = this.sectores.some(sector => sector === sectorOriginal);
      if (!yaExiste) {
        this.sectores.push(sectorOriginal);
      }
    })
  }

  get formcDni() {
    return this.dniForm.controls;
  }

  get hayErrorFcDni() {
    return !this.dniForm.valid;
  }

  get fcIngreso() {
    return this.ingresoForm.controls;
  }

  onSubmitDni() {
    this.seEnvioDni = true;
    if (this.dniForm.valid) {
      this.renaperMockService.get(this.dniForm.value.dni)
        .subscribe(
          (data: HttpResponse<RenaperResponse>) => {
            this.nombreApellidoIngreso = `${data.body.nombres} ${data.body.apellido}`;
          },
          error => alert(error.error.mensaje)
        );
    }
  }

  onSubmitIngreso() {
    this.seEnvioIngresar = true;
    // hacer un alert que diga que "Debe ingresar el dni" si no lo hizo
    if (this.dniForm.valid) {
      // hacer un alert si no hizo la consulta a renaper
      if (this.nombreApellidoIngreso !== undefined) {
        if (this.ingresoForm.valid) {
          alert('Ingreso registrado');
          this.hoy = new Date();
          this.nombreApellidoIngreso = undefined;
          this.dniForm.clearValidators();
          this.dniForm.reset();
          this.seEnvioDni = false;
          this.ingresoForm.clearValidators();
          this.ingresoForm.reset();
          this.seEnvioIngresar = false;
        }
      } else {
        alert('Debe consultar el nombre y apellido del DNI');
      }
    } else {
      alert('Debe ingrear el DNI');
    }

  }

}
