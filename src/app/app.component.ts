import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: './components/apertura-entregas/apertura-entregas.component.html', icon: 'mail' },
    { title: 'Outbox', url: './components/apertura-entregas/apertura-entregas.component.html', icon: 'paper-plane' },
    { title: 'Favorites', url: './components/apertura-entregas/apertura-entregas.component.html', icon: 'heart' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
