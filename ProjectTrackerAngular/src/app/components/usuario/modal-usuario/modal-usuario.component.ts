import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../modules/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { PermisoService } from '../../../services/permiso.service';
import { UtilityService } from '../../../services/utility.service';
import { Permiso } from '../../../interfaces/permiso';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [SharedModule, AsyncPipe, NgForOf],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.scss'
})
export class ModalUsuarioComponent {
  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioUsuario: FormGroup

  // Lista de Permisos
  listaPermisos: Permiso[] = []

  // Ttiulo del componente
  tituloAccion: string = "Agregar"

  // Titulo del boton del componente
  botonAccion: string = "Guardar"

  // Ocultar Contraseña
  ocultarContrasena: boolean = true

  // Obtiene la lista de filtrada por la busqueda
  public filtradoPermiso: ReplaySubject<Permiso[]> = new ReplaySubject<Permiso[]>(1);

  // Controla el filtrador del MatSelect para seleccion multiple
  public permisoFiltroCtrl: FormControl<string | null> = new FormControl<string>('');

  // Emite un "Subject" (Emisores de Eventos) cuando el componente del select es cerrado
  protected _onDestroy = new Subject<void>();

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private permisoService: PermisoService,
    private utilityService: UtilityService,
  ) {

    this.formularioUsuario = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', Validators.required],
      contrasena: [''],
      confirmarContrasena: [''],
      correo: ['', Validators.required],
      permisoId: ['', Validators.required],
      primerInicio: ['1']
    })

    if (this.datosUsuario != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
    else {
      this.formularioUsuario.get('contrasena')?.setValidators([Validators.required]);
      this.formularioUsuario.get('confirmarContrasena')?.setValidators([Validators.required]);
    }
  }

  ngOnInit(): void {
    if (this.datosUsuario != null) {
      this.formularioUsuario.patchValue({
        cedula: this.datosUsuario.usuaCedula,
        nombre: this.datosUsuario.usuaNombre,
        telefono: this.datosUsuario.usuaTelefono,
        direccion: this.datosUsuario.usuaDireccion,
        username: this.datosUsuario.usuaUsername,
        correo: this.datosUsuario.usuaCorreo
      })

      this.formularioUsuario.get('primerInicio')?.setValue(this.datosUsuario.usuaPrimerInicio)
      this.formularioUsuario.get('permisoId')?.setValue(this.datosUsuario.usuaPermId)
    }

    this.permisoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaPermisos = data.value

          // Carga la lista inicial
          this.filtradoPermiso.next(this.listaPermisos.slice())
        }
      },
      error: (e) => { }
    });



    // Toma el valor del campo de busqueda por cambios
    this.permisoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarPermisos()
      });
  }

  submitUsuario() {
    const _usuario: Usuario = {
      usuaId: this.datosUsuario == null ? 0 : this.datosUsuario.usuaId,
      usuaCedula: this.formularioUsuario.value.cedula,
      usuaNombre: this.formularioUsuario.value.nombre,
      usuaUsername: this.formularioUsuario.value.username,
      usuaTelefono: this.formularioUsuario.value.telefono,
      usuaDireccion: this.formularioUsuario.value.direccion,
      usuaCorreo: this.formularioUsuario.value.correo,
      usuaContrasena: this.formularioUsuario.value.contrasena,
      usuaPermId: this.formularioUsuario.value.permisoId,
      usuaPermNombre: "",
      usuaPrimerInicio: this.formularioUsuario.value.primerInicio == true ? 1 : 0
    }

    if (this.datosUsuario == null) {
      this.usuarioService.Guardar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El usuario fue registrado", "exito");
            this.modalActual.close();
          }
          else {
            this.utilityService.mostrarAlerta("No se pudo registrar el usuario", "error")
          }
        },
        error: (e) => { }
      })
    }
    else {
      this.usuarioService.Editar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El usuario fue actualizado", "exito");
            this.modalActual.close("true");
          }
          else {
            this.utilityService.mostrarAlerta("No se pudo actualizar el usuario", "error")
          }
        },
        error: (e) => { }
      })
    }
  }

  protected filtrarPermisos() {
    if (!this.listaPermisos) {
      return;
    }

    // Obtiene el texto de busqueda
    let search = this.permisoFiltroCtrl.value;

    if (!search) {
      this.filtradoPermiso.next(this.listaPermisos.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }

    // Filtra la lista de permisos
    this.filtradoPermiso.next(
      this.listaPermisos.filter(permiso => permiso.permNombre.toLowerCase().indexOf(search!) > -1)
    );
  }
}
