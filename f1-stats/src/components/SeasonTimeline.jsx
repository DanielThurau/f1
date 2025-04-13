import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SeasonTimeline = ({ seasonResults, drivers }) => {
  // Process the data for the chart
  const processedData = seasonResults.map(race => {
    const raceData = {
      name: race.race,
      round: race.round,
    };
    
    // Add position for each driver
    race.results.forEach(result => {
      raceData[result.driverId] = result.position;
    });
    
    return raceData;
  });
  
  // Get colors for drivers
  const driverColors = {
    VER: "#0600EF", // Red Bull
    PER: "#0600EF", // Red Bull
    NOR: "#FF8700", // McLaren
    PIA: "#FF8700", // McLaren
    LEC: "#DC0000", // Ferrari
    SAI: "#DC0000", // Ferrari
    HAM: "#00D2BE", // Mercedes
    RUS: "#00D2BE", // Mercedes
    ALO: "#006F62", // Aston Martin
    STR: "#006F62", // Aston Martin
  };
  
  // Get driver names for legend
  const driverNames = drivers.reduce((acc, driver) => {
    acc[driver.id] = driver.name;
    return acc;
  }, {});

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Season Timeline
      </Heading>
      
      <Box 
        bg={useColorModeValue("white", "gray.700")} 
        p={4} 
        borderRadius="md" 
        boxShadow="md"
        height="600px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
            <YAxis reversed domain={[1, 20]} tickCount={10} label={{ value: 'Position', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend verticalAlign="top" />
            
            {drivers.slice(0, 10).map(driver => (
              <Line
                key={driver.id}
                type="monotone"
                dataKey={driver.id}
                name={driverNames[driver.id]}
                stroke={driverColors[driver.id] || "#999"}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default SeasonTimeline;