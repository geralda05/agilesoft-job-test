import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-message',
  standalone: true,
  imports: [],
  templateUrl: './loading-message.component.html',
  styleUrl: './loading-message.component.scss'
})
export class LoadingMessageComponent {
  @Input() message = 'Cargando';
}
