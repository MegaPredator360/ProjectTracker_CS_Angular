import { Component } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

export interface UsuarioInfo {
  correo: string;
  contrasena: string;
  permiso: string;
}

const ELEMENT_DATA: UsuarioInfo[] = [
  { correo: "admin@correo.com", contrasena: "12345", permiso: "Administrador" },
  { correo: "gestor@correo.com", contrasena: "12345", permiso: "Gerente" },
  { correo: "user@correo.com", contrasena: "12345", permiso: "Usuario" }
];

@Component({
  selector: 'app-modal-ayuda-inicio',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-ayuda-inicio.component.html',
  styleUrl: './modal-ayuda-inicio.component.scss'
})

export class ModalAyudaInicioComponent {

  displayedColumns: string[] = ['correo', 'contrasena', 'permiso'];
  dataSource = ELEMENT_DATA;

  constructor(
    private modalActual: MatDialogRef<ModalAyudaInicioComponent>,
  ) { }

  closeModal() {
    this.modalActual.close()
  }
}
