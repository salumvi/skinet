import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { IUserLogin } from '../../share/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidatorsService } from '../../core/services/validators.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  url: string;
  constructor( 
    private accS: AccountService,
    private valS: ValidatorsService,
    private ruta: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.activateRoute.snapshot.queryParams.url || '/shop';
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [this.valS.requiredPersonal, this.valS.patternEmail]),
      password: new FormControl('', [this.valS.requiredPersonal, this.valS.patternPass])
    });

  }

  onSubmit(){
    console.log();

    const userLogin: IUserLogin = {...this.loginForm.value};
    this.accS.login(userLogin).subscribe(() => {
     this.ruta.navigateByUrl(this.url);
    }, error => {
      console.log(error);
      this.loginForm.reset();
    });

  }

  }
