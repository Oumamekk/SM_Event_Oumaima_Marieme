import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  register(loginFormdata: { value: { email: string; password: string; }; }) {
    this.loginService.register(loginFormdata.value.email, loginFormdata.value.password)
      .pipe(first())
      .subscribe({
        next: (response) => {
          alert(`Nous sommes heureux de vous compter parmi les membres de SM Event. Connectez vous svp ` ) ;
        },
        error: (error) => {
          alert('Ce compte existe déja. Veuillez vous connecter');
        },
      });
    this.router.navigate(['login']);
  }
}
