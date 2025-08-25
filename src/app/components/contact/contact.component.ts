import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  openEmail(): void {
    // Try default mail client first (href does this). As a reliable fallback, open Gmail compose.
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=landicandela01@gmail.com&su=Let\'s%20work%20together&body=Hi%20Candela,';
    // Defer a tick so the browser can process the anchor href first; if blocked, open Gmail
    setTimeout(() => {
      // If user email client didn’t open, they can still click the new tab
      window.open(gmailUrl, '_blank', 'noopener');
    }, 50);
  }
}
