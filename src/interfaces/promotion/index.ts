import { RestaurantInterface } from 'interfaces/restaurant';

export interface PromotionInterface {
  id?: string;
  restaurant_id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;

  restaurant?: RestaurantInterface;
  _count?: {};
}
