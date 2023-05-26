import { FeedbackInterface } from 'interfaces/feedback';
import { MenuInterface } from 'interfaces/menu';
import { OrderInterface } from 'interfaces/order';
import { PromotionInterface } from 'interfaces/promotion';
import { StaffInterface } from 'interfaces/staff';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  location: string;
  contact_info: string;
  operating_hours: string;
  owner_id: string;
  feedback?: FeedbackInterface[];
  menu?: MenuInterface[];
  order?: OrderInterface[];
  promotion?: PromotionInterface[];
  staff?: StaffInterface[];
  user?: UserInterface;
  _count?: {
    feedback?: number;
    menu?: number;
    order?: number;
    promotion?: number;
    staff?: number;
  };
}
