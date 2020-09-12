import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bck-img');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bck-img');
  }
  public user : User;

  constructor(private loginService: LoginService, private router: Router) {
  	this.user = new User();
  }

  validateLogin() {
  	if(this.user.username && this.user.password) {
  		this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
          this.router.navigate(['/home']);
        } else {
          alert('Usuário ou senha inválidos');
        }

      }, error => {
        console.log('error is ', error);
      });
  	} else {
  		alert('Entre com seu nome de usuário e senha');
  	}
  }

}
