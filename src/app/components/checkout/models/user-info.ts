export interface IUserInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export class UserInfo implements IUserInfo {
  email: string;

  firstName: string;

  lastName: string;

  phone: string;

  constructor(userInfo: any) {
    this.mapFromDTO(userInfo);
  }

  private mapFromDTO(userInfo: any) {
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.phone = userInfo.phone;
    this.email = userInfo.email;
  }
}
