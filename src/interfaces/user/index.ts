import { FeedbackInterface } from 'interfaces/feedback';
import { OrderInterface } from 'interfaces/order';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';

export interface UserInterface {
  id?: string;
  roq_user_id: string;
  tenant_id: string;
  role: string;
  feedback?: FeedbackInterface[];
  order?: OrderInterface[];
  restaurant?: RestaurantInterface[];
  staff?: StaffInterface[];

  _count?: {
    feedback?: number;
    order?: number;
    restaurant?: number;
    staff?: number;
  };
}
