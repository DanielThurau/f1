import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, Image, Badge, Heading } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

const DriverStandings = ({ drivers }) => {
  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Driver Championship Standings
      </Heading>
      
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>Pos</Th>
            <Th>Driver</Th>
            <Th>Team</Th>
            <Th isNumeric>Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drivers.map((driver) => (
            <Tr key={driver.id}>
              <Td>
                <Flex align="center">
                  <Text fontWeight="bold" mr={2}>{driver.position}</Text>
                  {driver.positionChange > 0 && (
                    <TriangleUpIcon color="green.500" />
                  )}
                  {driver.positionChange < 0 && (
                    <TriangleDownIcon color="red.500" />
                  )}
                </Flex>
              </Td>
              <Td>
                <Flex align="center">
                  <Box 
                    borderRadius="full" 
                    overflow="hidden" 
                    mr={3}
                    width="50px"
                    height="50px"
                    bg="gray.100"
                  >
                    <Image src={driver.imageUrl} alt={driver.name} />
                  </Box>
                  <Text fontWeight="bold">{driver.name}</Text>
                </Flex>
              </Td>
              <Td>{driver.team}</Td>
              <Td isNumeric fontWeight="bold">{driver.points}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DriverStandings; 