import {Component, HostListener, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public authentified: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginService.storageSub.subscribe(status => {
      if (status == 'tokenAdded') {
        this.authentified = true
      }
    });
  }

  public logout(): void {
    this.loginService.logout();
    this.authentified = false;
  }

  ngOnInit(): void {
    this.authentified = this.loginService.isAuthenticated();
  }

}
