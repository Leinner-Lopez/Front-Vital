import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
})
export class ErrorModal {
  isOpen = model<boolean>(false);
  message = input<string | null>('');
  title = input<string | null>('');
}
