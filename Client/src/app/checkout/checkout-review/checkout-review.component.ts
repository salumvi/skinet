import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket, IBasketItem, IBasketTotals } from '../../share/models/basket';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper, CdkStepperNext } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {

  @Input() appStepper: CdkStepper;
  basket$: Observable<IBasket>;
  isBasket=false;
  isOrder = false;
  constructor(private basS: BasketService, private toast: ToastrService) { }
  

  ngOnInit(): void {
  
    this.basket$= this.basS.basket$;
  }

  createPaymentIntent(){
    this.basS.createPaymentIntent().subscribe( res => {
      this.appStepper.next();
    }, error =>{
      console.log(error);

    })
  }



}
