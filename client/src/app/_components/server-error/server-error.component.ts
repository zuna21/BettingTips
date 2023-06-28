import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {
  private router: Router = inject(Router);

  onLoginPage() {
    if (!localStorage.getItem('userToken')) return;
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }
}
