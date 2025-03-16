export interface NotificationsData {
    email: boolean;
    push: boolean;
    sms: boolean;
  }
  
  export interface UserSettingsData {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    age: string;
    password: string;
    notifications: NotificationsData;
  }
  