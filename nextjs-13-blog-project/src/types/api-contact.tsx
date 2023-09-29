import { InsertOneResult } from 'mongodb';

export interface ContactBody {
  email: string;
  name: string;
  message: string;
}

export type ContactResponse = {
  message: string;
  contact?: InsertOneResult<Document>;
};
