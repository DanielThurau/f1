import { Box, Heading, Flex, Tabs, TabList, Tab } from '@chakra-ui/react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <Box bg="gray.800" color="white" p={4} shadow="md">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading as="h1" size="lg">
          F1 Season Statistics
        </Heading>

        <Tabs variant="soft-rounded" colorScheme="red" index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Driver Standings</Tab>
            <Tab>Constructor Standings</Tab>
            <Tab>Season Timeline</Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default Header;
