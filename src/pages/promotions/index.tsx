import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getPromotions } from 'apiSdk/promotions';
import { PromotionInterface } from 'interfaces/promotion';
import { Error } from 'components/error';

function PromotionListPage() {
  const { data, error, isLoading } = useSWR<PromotionInterface[]>(
    () => '/promotions',
    () =>
      getPromotions({
        relations: ['restaurant'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Promotion
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
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th>Restaurant</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.name}</Td>
                    <Td>{record.description}</Td>
                    <Td>{record.start_date as unknown as string}</Td>
                    <Td>{record.end_date as unknown as string}</Td>
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
export default PromotionListPage;
