export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface PhoneNumbers {
  type: string;
  value: string;
}

export interface userPhoneNumberData {
  email: string;
  phoneNumbers: PhoneNumbers[];
}

export interface userEmailsData {
  email: string;
  firstName: string;
  lastName: string;
}

export interface getUsersParamsProps {
  page: number;
  limit: number;
  email: string | null;
  phonenumber: string | null;
  firstname: string | null;
  lastname: string | null;
  offset?: number;
}
