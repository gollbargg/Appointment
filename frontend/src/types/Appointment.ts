import { Buyer } from "./buyer";
import { Vendor } from "./Vendor";

export interface Appointment {
  id: number;
  title: string;
  type:string
  location:string
  host:Vendor
  client:Buyer;
  startTime: string;
  endTime: string;
}