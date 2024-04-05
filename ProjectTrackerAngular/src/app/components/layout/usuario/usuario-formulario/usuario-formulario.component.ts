import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PermisoService } from '../../../../service/permiso.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { UtilityService } from '../../../../utility/utility.service';
import { Usuario } from '../../../../interface/usuario';
import { Permiso } from '../../../../interface/permiso';
import { Router } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrl: './usuario-formulario.component.scss'
})

export class UsuarioFormularioComponent implements OnInit {
  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioUsuario: FormGroup

  // Lista de Permisos
  listaPermisos: Permiso[] = []

  // Datos de usuario
  datosUsuario!: Usuario

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

  _utilityService!: UtilityService

  constructor(
    private usuarioService: UsuarioService,
    private permisoService: PermisoService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosUsuario = this.usuarioService.getDatosUsuario()

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
      // Si el formulario no está vacio, no se solicitará la contraseña ya que solo se actualizarán datos
      this.formularioUsuario.get('contrasena')?.setValidators(Validators.required)
      this.formularioUsuario.get('confirmarContrasena')?.setValidators(Validators.required)
    }

    // Lista de Permisos
    this.permisoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaPermisos = data.value
          this.filtrarPermisos()
        }
      },
      error: (e) => { 
        this.utilityService.mostrarAlerta("Ocurrio un error al cargar la lista de permisos", "error")
        console.log(e)
      }
    })
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

    // Carga la lista inicial
    this.filtradoPermiso.next(this.listaPermisos.slice())

    // Toma el valor del campo de busqueda por cambios
    this.permisoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarPermisos()
      });
  }

  submitUsuario() {

    // Se verificará que el correo ingresado sea un correo valido
    if (!this.utilityService.verificarCorreo(this.formularioUsuario.value.correo)) {
      // Se le realizará un focus al input
      this.elementRef.nativeElement.querySelector('[formcontrolname="correo"]').focus()
      this.utilityService.mostrarAlerta("El correo ingresado no es valido", "error")
      return
    }

    if (this.formularioUsuario.value.contrasena != "") {

      // Se verifica que la contraseña cumpla con los requisitos: 1 Mayuscula, 1 minuscula, 1 simbolo, 1 numero y 8 caracteres
      if (!this.utilityService.verificarContrasena(this.formularioUsuario.value.contrasena)) {

        this.elementRef.nativeElement.querySelector('[formcontrolname="contrasena"]').focus()
        this.utilityService.mostrarAlerta("La contraseña no cumple con los requisitos minimos", "error")
        return
      }

      if (this.formularioUsuario.value.contrasena != this.formularioUsuario.value.confirmarContrasena) {
        // Se le realizará un focus al input
        this.elementRef.nativeElement.querySelector('[formcontrolname="confirmarContrasena"]').focus()
        this.utilityService.mostrarAlerta("Las contraseñas no son iguales", "error")
        return
      }
    }

    const usuario: Usuario = {
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
      this.usuarioService.Guardar(usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El usuario fue registrado", "exito")
            this.router.navigate(['../pages/usuario'])
          }
          else {
            // Mostrará un mensaje indicando que ya un usuario existe con la informacion ingresada
            if (data.msg == "usuaCedulaExiste") {
              this.utilityService.mostrarAlerta("Ya existe un usuario con la cedula ingresada", "error")
            }
            else if (data.msg == "usuaCorreoExiste") {
              this.utilityService.mostrarAlerta("Ya existe un usuario con el correo ingresado", "error")
            }
            else if (data.msg == "usuaUsernameExiste") {
              this.utilityService.mostrarAlerta("Ya existe un usuario con el nombre de usuario ingresado", "error")
            }
            else {
              this.utilityService.mostrarAlerta("No se pudo registrar el usuario", "error")
              console.log(data.msg)
            }
          }
        },
        error: (e) => {
          this.utilityService.mostrarAlerta("Ocurrio un error al registrar el usuario", "error")
          console.log(e)
        }
      })
    }
    else {
      this.usuarioService.Editar(usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El usuario fue actualizado", "exito")
            this.router.navigate(['../pages/usuario'])
          }
          else {
            this.utilityService.mostrarAlerta("Ocurrio un error al actualizar el usuario", "error")
            console.log(data.msg)
          }
        },
        error: (e) => {
          this.utilityService.mostrarAlerta("Ocurrio un error al actualizar el usuario", "error")
          console.log(e)
        }
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