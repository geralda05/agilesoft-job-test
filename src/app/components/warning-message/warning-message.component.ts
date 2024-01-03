import { Component, Input } from '@angular/core';

@Component({
  selector: 'warning-message',
  standalone: true,
  imports: [],
  templateUrl: './warning-message.component.html',
  styleUrl: './warning-message.component.scss'
})
export class WarningMessageComponent {
  @Input() message = 'Error interno'
}
