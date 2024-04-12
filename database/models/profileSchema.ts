import {Country, Currency } from "../../const/constants";

export interface ProfileSchema {
  firstname?: string,
  lastname?: string,
  age?: number,
  currency?: Currency | '',
  country?: Country | '',
  city?: string,
  username: string,
  avatar?: string;
}