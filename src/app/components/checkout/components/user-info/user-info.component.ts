import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent {
  @Input() checkoutService: CheckoutService;

  userInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userInfoForm = formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.userInfoForm.valid) {
      this.checkoutService.saveUserInfo(this.userInfoForm.getRawValue());
    }
  }
}
