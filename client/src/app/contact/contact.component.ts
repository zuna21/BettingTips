import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private router: Router = inject(Router);

  onFacebook() {
    window.location.href = 'https://www.facebook.com/profile.php?id=100093207565929';
  }

  onInstagram() {
    window.location.href = 'https://www.instagram.com/bet_master_advice';
  }

  onTwitter() {
    window.location.href = 'https://twitter.com/bettingadvice6';
  }

  onTiktok() {
    window.location.href = 'https://www.tiktok.com/@bet_master_advice';
  }

  onTelegram() {
    window.location.href = 'https://t.me/+x2ZLt45L32w3YzJK'
  }
}
