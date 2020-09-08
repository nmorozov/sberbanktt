import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeliveryTypes } from '../../models/delivery-info';
import { CountryService } from '../../../../services/country.service';
import { ICountry } from '../../models/country';
import { CheckoutService } from '../../services/checkout.service';
import { DialogComponent } from '../../../dialog/dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
})
export class DeliveryComponent implements OnInit {
  @Input() checkoutService: CheckoutService;

  isLoading: boolean;

  deliveryForm: FormGroup;

  deliveryTypes = DeliveryTypes;

  countries: ICountry[] = [];

  validationType = {
    deliveryType: null,
    country: [Validators.required],
    city: [Validators.required, Validators.maxLength(255)],
    postalCode: [Validators.required, Validators.maxLength(6)],
    address: [Validators.required, Validators.maxLength(255)],
    deliveryDate: [Validators.required],
    commentary: null,
  };

  ngOnInit(): void {
    this.countryService
      .getCountries()
      .pipe(untilDestroyed(this))
      .subscribe((countries) => {
        this.countries = countries;
      });

    this.deliveryForm
      .get('deliveryType')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((deliveryType) => {
        if (deliveryType === this.deliveryTypes.CAR_DELIVERY) {
          this.addValidators(this.deliveryForm);
        } else {
          this.removeValidators(this.deliveryForm);
        }
      });

    this.checkoutService.currentStep.pipe(untilDestroyed(this)).subscribe(() =>
      this.deliveryForm.reset({
        deliveryType: DeliveryTypes.CAR_DELIVERY,
      }),
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private dialog: MatDialog,
  ) {
    this.deliveryForm = this.formBuilder.group({
      deliveryType: [DeliveryTypes.CAR_DELIVERY],
      country: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      postalCode: ['', [Validators.required, Validators.maxLength(6)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      deliveryDate: ['', [Validators.required]],
      commentary: [''],
    });
  }

  private removeValidators(form: FormGroup) {
    Object.values(form.controls).forEach((control) => {
      control.clearValidators();
      control.updateValueAndValidity({ emitEvent: false });
    });
  }

  private addValidators(form: FormGroup) {
    Object.keys(form.controls).forEach((controlKey) => {
      form.get(controlKey).setValidators(this.validationType[controlKey]);
      form.get(controlKey).updateValueAndValidity({ emitEvent: false });
    });
  }

  submit() {
    if (this.deliveryForm.valid) {
      this.checkoutService.saveDeliveryInfo(this.deliveryForm.getRawValue());
      this.isLoading = true;
      this.checkoutService
        .complete()
        .pipe(
          switchMap((result) => {
            return of([
              result,
              this.dialog
                .open(DialogComponent, {
                  data: {
                    message: result ? 'Успешно отправлено' : 'Просьба повторить запрос позже',
                  },
                })
                .afterClosed(),
            ]);
          }),
          untilDestroyed(this),
        )
        .subscribe(([checkoutCompleteResult]) => {
          this.isLoading = false;
          if (checkoutCompleteResult) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        });
    }
  }
}
