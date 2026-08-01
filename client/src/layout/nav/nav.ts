import { Component, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService)
  protected creds: any= {}
  private router=inject(Router);
  private toastServices= inject(ToastService)

  login(){
    this.accountService.login(this.creds).subscribe(
      {
        next: result=> {
          this.router.navigateByUrl('/members')
          this.creds ={};
          this.toastServices.success("login successfully");
        },
        error: error=> {
          console.log(error);
          this.toastServices.error(error.error);

        }
      }
    )
  }
  logout(){
     this.accountService.logout();
     this.router.navigateByUrl('/')
  }
}
