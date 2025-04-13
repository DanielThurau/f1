import { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from './components/Header';
import DriverStandings from './components/DriverStandings';
import ConstructorStandings from './components/ConstructorStandings';
import SeasonTimeline from './components/SeasonTimeline';
import { drivers, constructors, seasonResults } from './data/f1Data2025';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <Box p={4}>
          {activeTab === 0 && <DriverStandings drivers={drivers} />}
          {activeTab === 1 && <ConstructorStandings constructors={constructors} />}
          {activeTab === 2 && <SeasonTimeline seasonResults={seasonResults} drivers={drivers} />}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;