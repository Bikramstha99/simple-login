import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
cards = [
    { title: 'Card 1', content: 'Content for card 1' },
    { title: 'Card 2', content: 'Content for card 2' },
    { title: 'Card 3', content: 'Content for card 3' }
  ];


addCard() {
    const newCardNumber = this.cards.length + 1;
    this.cards.push({ title: `Card ${newCardNumber}`, content: `Content for card ${newCardNumber}` });
  }


deleteCard(index: number) {
    this.cards.splice(index, 1);
  }


}



