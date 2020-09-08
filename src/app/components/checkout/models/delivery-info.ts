export enum DeliveryTypes {
  CAR_DELIVERY,
  PICKUP,
}

export interface IDeliveryInfo {
  deliveryType: DeliveryTypes;
  commentary: string;
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  deliveryDate?: string;
}

export class DeliveryInfo implements IDeliveryInfo {
  address: string;

  city: string;

  commentary: string;

  country: string;

  deliveryDate: string;

  deliveryType: DeliveryTypes;

  postalCode: string;

  constructor(deliveryInfo) {
    this.mapFromDTO(deliveryInfo);
  }

  private mapFromDTO(deliveryInfo) {
    this.deliveryType = deliveryInfo.deliveryType;
    this.commentary = deliveryInfo.commentary;
    this.address = deliveryInfo.address || null;
    this.city = deliveryInfo.city || null;
    this.country = deliveryInfo.country || null;
    this.deliveryDate = deliveryInfo.deliveryDate || null;
    this.postalCode = deliveryInfo.postalCode || null;
  }
}
