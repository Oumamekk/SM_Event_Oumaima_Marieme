import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first, Subject} from "rxjs";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(loginFormdata: { value: { email: string; password: string; }; }) {
    this.loginService.login(loginFormdata.value.email, loginFormdata.value.password)
      .pipe(first())
      .subscribe({
      next: (response) => {
        this.loginService.setToken('token',response.id)
        alert(`Bienvenue: `+ loginFormdata.value.email);
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert('Veuillez vérifier vos informations de connexion');
      },
    });
  }


}
