import { Box, Heading, Flex, Text, Image, Progress } from '@chakra-ui/react';

const ConstructorStandings = ({ constructors }) => {
  // Find maximum points for scaling the progress bars
  const maxPoints = Math.max(...constructors.map(c => c.points));

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Constructor Championship Standings
      </Heading>

      {constructors.map(constructor => (
        <Box
          key={constructor.id}
          mb={4}
          p={4}
          borderRadius="md"
          boxShadow="md"
          borderLeft={`6px solid ${constructor.color}`}
        >
          <Flex justify="space-between" align="center" mb={2}>
            <Flex align="center">
              <Box fontSize="xl" fontWeight="bold" mr={4}>
                {constructor.position}
              </Box>
              <Image src={constructor.logoUrl} alt={constructor.name} height="40px" mr={3} />
              <Text fontWeight="bold" fontSize="lg">
                {constructor.name}
              </Text>
            </Flex>
            <Text fontWeight="bold" fontSize="xl">
              {constructor.points} PTS
            </Text>
          </Flex>
          <Progress
            value={(constructor.points / maxPoints) * 100}
            size="md"
            colorScheme={constructor.color === '#FFFFFF' ? 'gray' : undefined}
            sx={
              constructor.color !== '#FFFFFF'
                ? {
                    '& > div': {
                      background: constructor.color,
                    },
                  }
                : {}
            }
          />
        </Box>
      ))}
    </Box>
  );
};

export default ConstructorStandings;
