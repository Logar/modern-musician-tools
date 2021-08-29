import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };

  setMessage(body: string, type: string) {
    const self = this;
    this.message.body = body;
    this.message.type = type;
    // Wait at least 5 seconds before hiding
    setTimeout(() => (self.message.body = ''), 5000);
  }
}
