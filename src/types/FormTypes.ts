import { DateRange } from "react-day-picker";

export interface IFormInput {
    PLZ: string;
    Ort: string;
    Nr: string;
    StraBe: string;
    Adressangaben: string;
    Nachname: string;
    Vorname: string;
    Postfach_Nr: string;
    Postfach_PLZ: string;
    Postfach_Ort: string;
    Beginn_der_Nachsendung: Date;
    Wieder_zustellen_ab: Date;
    Weitere_Vorname?: string;
    Weitere_Nachname?: string;
    Weitere_Vorname2?: string;
    Weitere_Nachname2?: string;
}


export interface INachsendungFormInput {
  PLZ: string;
  Ort: string;
  Nr: string;
  StraBe: string;
  
  Adressangaben: string;
  Nachname: string;
  Vorname: string;
  Postfach_Nr: string;
  Postfach_PLZ: string;
  Postfach_Ort: string;
  Grund: string;
  Datum: DateRange | undefined;
  umzugsmitteilung: string;
  Email?: string;
  familyMembers:  { [key: string]: boolean };
}

