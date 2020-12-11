import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { IAddress } from '../../share/models/address';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() checkOutForm: FormGroup;
  constructor(private accS: AccountService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  onClickSaveAddress(){
    this.accS.updateUserAddress(this.checkOutForm.controls.addressForm.value)
    .subscribe(address =>{
        this.toast.success("Address Modificada correcrtamente", "Address Save")
    },error => {
      this.toast.error("Problemas con el servidor", "Error Address")

    })
  }

}
