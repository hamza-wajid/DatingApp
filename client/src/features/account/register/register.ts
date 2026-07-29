import { Component, inject, Inject, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from "@angular/forms";
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService=inject(AccountService);
  cancleRegister= output<boolean>();
  protected creds = {} as RegisterCreds;

  register(){
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancle();
      },
      error: error=>console.log(error)
    })
  }
  cancle(){
    this.cancleRegister.emit(false);
    console.log("cancelled..")
  }
}
