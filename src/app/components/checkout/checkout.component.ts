import { Component } from '@angular/core';
import { CheckoutService, CheckoutSteps } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  checkoutSteps = CheckoutSteps;

  constructor(public checkoutService: CheckoutService) {}

  tabIndexChanged(tabIndex: number) {
    if (tabIndex === this.checkoutSteps.USER_INFO) {
      this.checkoutService.goBack();
    }
  }
}
