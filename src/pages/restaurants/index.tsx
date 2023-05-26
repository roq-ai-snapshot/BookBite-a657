import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getRestaurants } from 'apiSdk/restaurants';
import { RestaurantInterface } from 'interfaces/restaurant';
import { Error } from 'components/error';

function RestaurantListPage() {
  const { data, error, isLoading } = useSWR<RestaurantInterface[]>(
    () => '/restaurants',
    () =>
      getRestaurants({
        relations: ['user'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Restaurant
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Location</Th>
                  <Th>Contact Info</Th>
                  <Th>Operating Hours</Th>
                  <Th>Owner</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.name}</Td>
                    <Td>{record.location}</Td>
                    <Td>{record.contact_info}</Td>
                    <Td>{record.operating_hours}</Td>
                    <Td>{record.user?.roq_user_id}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default RestaurantListPage;
