import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AccountService } from '../account.service';
import { IUserRegister } from '../../share/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: string[];
  constructor(
    private fb: FormBuilder,
    private accS: AccountService,
    private valS: ValidatorsService,
    private ruta: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName: ['', this.valS.requiredPersonal ],
      email: ['', [this.valS.requiredPersonal, this.valS.patternEmail], [this.valS.exitsEmail()]],
      password: ['', [this.valS.requiredPersonal, this.valS.patternPass]],
      password2: ['']
    }
     ,{validators: this.valS.passWordIguales('password', 'password2')}
    );
    this.registerForm.reset({
      displayName: 'Bob',
      email: 'bob@test.com',
      password: 'Pa$$w0rd',
      password2: 'Pa$$w0rd',
    });

  }

  onSubmit(){
    // const userRegister: IUserRegister = {
    //   displayName: this.registerForm.value.displayName,
    //   email: this.registerForm.value.email,
    //   password: this.registerForm.value.password,
    // };
    const userRegister: IUserRegister = {...this.registerForm.value};
    this.accS.register(userRegister).subscribe(() => {
     this.ruta.navigateByUrl('/shop');
    }, error => {
      
      this.errors = error.errors;
      // this.registerForm.reset();
    });

  }


}
