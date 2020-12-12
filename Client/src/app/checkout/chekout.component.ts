import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../share/models/basket';

@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.scss'],
})
export class ChekoutComponent implements OnInit {
  chekOutForm: FormGroup;

  basketTotal$: Observable<IBasketTotals>;
  
  constructor(private fb: FormBuilder, private accS: AccountService, private basS: BasketService) {}


  ngOnInit(): void {
    this.createChekOutForm();
    this.setDefaultAddressUser();
    this.basketTotal$ = this.basS.basketTotal$;
  }

  createChekOutForm() {
    this.chekOutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        delivery: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        payment: [null, Validators.required],
      }),
    });
  }

  onGetAddress( event){
    
  }

  setDefaultAddressUser(){
  this.accS.getAddressUser().subscribe(address => {
    if(address){
      this.chekOutForm.controls.addressForm.reset({...address})
    }
  })
  }
 
}
