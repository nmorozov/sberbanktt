import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { IUserInfo, UserInfo } from '../models/user-info';
import { DeliveryInfo, IDeliveryInfo } from '../models/delivery-info';

export enum CheckoutSteps {
  USER_INFO,
  DELIVERY,
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  public currentStep: BehaviorSubject<CheckoutSteps> = new BehaviorSubject<CheckoutSteps>(
    CheckoutSteps.USER_INFO,
  );

  private userInfo: IUserInfo;

  private deliveryInfo: IDeliveryInfo;

  constructor(private httpClient: HttpClient) {}

  public saveUserInfo(userInfo) {
    this.userInfo = new UserInfo(userInfo);
    this.goToStep(CheckoutSteps.DELIVERY);
  }

  public saveDeliveryInfo(deliveryInfo) {
    this.deliveryInfo = new DeliveryInfo(deliveryInfo);
  }

  public goBack() {
    this.goToStep(CheckoutSteps.USER_INFO);
  }

  public complete(): Observable<boolean> {
    return this.httpClient
      .post(
        'http://127.0.0.1/test.php',
        JSON.stringify({ userInfo: this.userInfo, deliveryInfo: this.deliveryInfo }),
      )
      .pipe(
        switchMap((checkoutCompleteResult: { success: boolean }) =>
          of(checkoutCompleteResult.success),
        ),
      );
  }

  private goToStep(checkoutStep: CheckoutSteps) {
    this.currentStep.next(checkoutStep);
  }
}
