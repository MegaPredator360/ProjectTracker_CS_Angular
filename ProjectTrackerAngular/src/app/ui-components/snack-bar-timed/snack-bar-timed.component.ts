import { Component } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-snack-bar-timed',
  templateUrl: './snack-bar-timed.component.html',
  styleUrl: './snack-bar-timed.component.scss'
})

export class SnackBarTimedComponent {
  mensajeSnackBar: string = ""

  constructor(
    private utilityService: UtilityService
  ) {
    this.mensajeSnackBar = this.utilityService.obtenerSnackBarMessage()
  }
}
