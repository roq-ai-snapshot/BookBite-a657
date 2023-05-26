import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getMenus } from 'apiSdk/menus';
import { MenuInterface } from 'interfaces/menu';
import { Error } from 'components/error';

function MenuListPage() {
  const { data, error, isLoading } = useSWR<MenuInterface[]>(
    () => '/menus',
    () =>
      getMenus({
        relations: ['restaurant'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu
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
                  <Th>Price</Th>
                  <Th>Availability</Th>
                  <Th>Restaurant</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.name}</Td>
                    <Td>{record.price}</Td>
                    <Td>{record.availability}</Td>
                    <Td>{record.restaurant?.name}</Td>
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
export default MenuListPage;
