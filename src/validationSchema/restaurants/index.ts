import * as yup from 'yup';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { menuValidationSchema } from 'validationSchema/menus';
import { orderValidationSchema } from 'validationSchema/orders';
import { promotionValidationSchema } from 'validationSchema/promotions';
import { staffValidationSchema } from 'validationSchema/staff';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  contact_info: yup.string().required(),
  operating_hours: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  feedback: yup.array().of(feedbackValidationSchema),
  menu: yup.array().of(menuValidationSchema),
  order: yup.array().of(orderValidationSchema),
  promotion: yup.array().of(promotionValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
