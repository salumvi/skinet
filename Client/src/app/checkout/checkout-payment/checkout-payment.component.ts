import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { ChekoutService } from '../chekout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/share/models/basket';
import { IOrder, IOrderToCreate } from '../../share/models/order';
import { Router, NavigationExtras } from '@angular/router';
import { AfterViewInit } from '@angular/core';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkOutForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;

  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: string;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberComplete: false;
  cardExpiryComplete: false;
  cardCvcComplete: false;

  constructor(
    private basS: BasketService,
    private cheS: ChekoutService,
    private toast: ToastrService,
    private ruta: Router
  ) {}

  ngAfterViewInit(): void {
    this.stripe = Stripe(
      'pk_test_51HxZ52BZd3TGycl1ns7P9ouHDvOloTTLB7yWEqbkdtlKMypJTSndNlicQZ2iZcQ1crWRqokqTQLM88TW4cx7RmxQ004dQzJpQY'
    );
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
  onChange(event) {
    console.log(event);
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }

    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberComplete = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryComplete = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcComplete = event.complete;
        break;
    }
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basS.getCurrentBasketValue();
    const createOrder = await this.createOrder(basket);
    const paymentResult = await this.confirmPaymentWithStripe(basket);

    try {
      this.loading = false;
      if (paymentResult.paymentIntent) {
        console.log('borrar bolsa');
        this.basS.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createOrder };
        this.ruta.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toast.error('error al hacer el pago');
      }
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }
  private async confirmPaymentWithStripe(basket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkOutForm.get('paymentForm').get('nameOnCard').value,
        },
      },
    });
  }
  private createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.cheS.createOrder(orderToCreate).toPromise();
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    console.log(this.checkOutForm.controls.deliveryForm.value.delivery);
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkOutForm.controls.deliveryForm.value.delivery,
      shipToAddress: this.checkOutForm.controls.addressForm.value,
    };
  }
}
