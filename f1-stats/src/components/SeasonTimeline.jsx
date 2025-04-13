import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';

const SeasonTimeline = ({ seasonResults, drivers }) => {
  const [hiddenDrivers, setHiddenDrivers] = useState(new Set());

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
  const driverColors = drivers.reduce((acc, driver) => {
    // Map team names to colors
    const teamColors = {
      McLaren: '#FF8700',
      'Red Bull Racing': '#0600EF',
      Mercedes: '#00D2BE',
      Ferrari: '#DC0000',
      Williams: '#005AFF',
      Haas: '#2F2F2F',
      Alpine: '#0090FF',
      'Aston Martin Aramco Mercedes': '#006F62',
      'Racing Bulls': '#1E41FF',
      'Kick Sauber': '#900000',
      'Williams Mercedes': '#005AFF',
    };

    acc[driver.id] = teamColors[driver.team] || '#999';
    return acc;
  }, {});

  // Get driver names for legend
  const driverNames = drivers.reduce((acc, driver) => {
    acc[driver.id] = driver.name;
    return acc;
  }, {});

  const handleLegendClick = entry => {
    setHiddenDrivers(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(entry.dataKey)) {
        newHidden.delete(entry.dataKey);
      } else {
        newHidden.add(entry.dataKey);
      }
      return newHidden;
    });
  };

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Season Timeline
      </Heading>

      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={4}
        borderRadius="md"
        boxShadow="md"
        height="600px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
            <YAxis
              reversed
              domain={[1, 20]}
              tickCount={10}
              label={{ value: 'Position', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={value => `P${value}`} itemSorter={item => item.value} />
            <Legend
              verticalAlign="top"
              onClick={handleLegendClick}
              formatter={(value, entry) => (
                <span
                  style={{
                    color: hiddenDrivers.has(entry.dataKey)
                      ? '#999'
                      : driverColors[entry.dataKey] || '#999',
                    fontWeight: 'bold',
                  }}
                >
                  {value}
                </span>
              )}
            />

            {drivers.slice(0, 20).map(driver => (
              <Line
                key={driver.id}
                type="monotone"
                dataKey={driver.id}
                name={driverNames[driver.id]}
                stroke={driverColors[driver.id] || '#999'}
                strokeWidth={2}
                hide={hiddenDrivers.has(driver.id)}
                dot={props => {
                  const { cx, cy } = props;
                  return (
                    <svg x={cx - 15} y={cy - 15} width={30} height={30}>
                      <defs>
                        <clipPath id={`clip-${driver.id}`}>
                          <circle cx="15" cy="15" r="15" />
                        </clipPath>
                      </defs>
                      <image
                        href={driver.imageUrl}
                        width={30}
                        height={30}
                        clipPath={`url(#clip-${driver.id})`}
                      />
                      <circle
                        cx="15"
                        cy="15"
                        r="15"
                        stroke={driverColors[driver.id] || '#999'}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  );
                }}
                activeDot={props => {
                  const { cx, cy } = props;
                  return (
                    <svg x={cx - 20} y={cy - 20} width={40} height={40}>
                      <defs>
                        <clipPath id={`clip-active-${driver.id}`}>
                          <circle cx="20" cy="20" r="20" />
                        </clipPath>
                      </defs>
                      <image
                        href={driver.imageUrl}
                        width={40}
                        height={40}
                        clipPath={`url(#clip-active-${driver.id})`}
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="20"
                        stroke={driverColors[driver.id] || '#999'}
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  );
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default SeasonTimeline;
