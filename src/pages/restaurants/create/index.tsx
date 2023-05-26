import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createRestaurant } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantInterface } from 'interfaces/restaurant';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function RestaurantCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RestaurantInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRestaurant(values);
      resetForm();
      router.push('/restaurants');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RestaurantInterface>({
    initialValues: {
      name: '',
      location: '',
      contact_info: '',
      operating_hours: '',
      owner_id: null,
      feedback: [],
      menu: [],
      order: [],
      promotion: [],
      staff: [],
    },
    validationSchema: restaurantValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Restaurant
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors.location}>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors.location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="contact_info" mb="4" isInvalid={!!formik.errors.contact_info}>
            <FormLabel>Contact Information</FormLabel>
            <Input type="text" name="contact_info" value={formik.values.contact_info} onChange={formik.handleChange} />
            {formik.errors.contact_info && <FormErrorMessage>{formik.errors.contact_info}</FormErrorMessage>}
          </FormControl>
          <FormControl id="operating_hours" mb="4" isInvalid={!!formik.errors.operating_hours}>
            <FormLabel>Operating Hours</FormLabel>
            <Input
              type="text"
              name="operating_hours"
              value={formik.values.operating_hours}
              onChange={formik.handleChange}
            />
            {formik.errors.operating_hours && <FormErrorMessage>{formik.errors.operating_hours}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'owner_id'}
            label={'Owner'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />

          <ArrayFormField
            values={formik.values.feedback}
            errors={formik.errors.feedback}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'rating', label: 'rating' },
              { fieldName: 'comment', label: 'comment' },
              { fieldName: 'customer_id', label: 'user' },
            ]}
            title={'Feedback'}
            name="feedback"
            rowInitialValues={{ rating: 0, comment: '', customer_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'rating' && (
                  <FormControl id="rating" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'comment' && (
                  <FormControl id="comment" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UserInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select User'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.menu}
            errors={formik.errors.menu}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'name', label: 'name' },
              { fieldName: 'price', label: 'price' },
              { fieldName: 'availability', label: 'availability' },
            ]}
            title={'Menu'}
            name="menu"
            rowInitialValues={{ name: '', price: 0, availability: false }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'name' && (
                  <FormControl id="name" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'price' && (
                  <FormControl id="price" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'availability' && (
                  <FormControl id="availability" display="flex" alignItems="center" isInvalid={Boolean(error)}>
                    <FormLabel htmlFor="switch-availability">{label}</FormLabel>
                    <Switch id="switch-availability" name={name} onChange={formik.handleChange} value={value ? 1 : 0} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.order}
            errors={formik.errors.order}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'status', label: 'status' },
              { fieldName: 'total_price', label: 'total_price' },
              { fieldName: 'customer_id', label: 'user' },
            ]}
            title={'Orders'}
            name="order"
            rowInitialValues={{ status: '', total_price: 0, customer_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'status' && (
                  <FormControl id="status" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'total_price' && (
                  <FormControl id="total_price" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UserInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select User'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.promotion}
            errors={formik.errors.promotion}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'name', label: 'name' },
              { fieldName: 'description', label: 'description' },
              { fieldName: 'start_date', label: 'start_date' },
              { fieldName: 'end_date', label: 'end_date' },
            ]}
            title={'Promotions'}
            name="promotion"
            rowInitialValues={{
              name: '',
              description: '',
              start_date: new Date(new Date().toDateString()),
              end_date: new Date(new Date().toDateString()),
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'name' && (
                  <FormControl id="name" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'description' && (
                  <FormControl id="description" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'start_date' && (
                  <FormControl id="start_date" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'end_date' && (
                  <FormControl id="end_date" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.staff}
            errors={formik.errors.staff}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'role', label: 'role' },
              { fieldName: 'user_id', label: 'user' },
            ]}
            title={'Staff'}
            name="staff"
            rowInitialValues={{ role: '', user_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'role' && (
                  <FormControl id="role" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'user_id' && (
                  <AsyncSelect<UserInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select User'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default RestaurantCreatePage;
