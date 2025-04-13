import axios from 'axios';

// Create an axios instance with base configuration
const f1Api = axios.create({
  baseURL: 'https://ergast.com/api/f1/current',
  timeout: 10000,
  headers: { 'Accept': 'application/json' }
});

// Team colors mapping - centralized for consistency
export const TEAM_COLORS = {
  'red_bull': '#0600EF',
  'mclaren': '#FF8700',
  'ferrari': '#DC0000',
  'mercedes': '#00D2BE',
  'aston_martin': '#006F62',
  'alpine': '#0090FF',
  'haas': '#FFFFFF',
  'williams': '#005AFF',
  'rb': '#1E41FF',
  'sauber': '#900000', // Will become Audi in 2026
};

// Helper function to create F1 image URLs
const getDriverImageUrl = (driver) => {
  return `https://www.formula1.com/content/dam/fom-website/drivers/${driver.driverId.charAt(0).toUpperCase()}/${driver.driverId.toUpperCase().substring(0,3)}${driver.permanentNumber}01_${driver.givenName}_${driver.familyName}/${driver.driverId}.png.transform/2col/image.png`;
};

const getTeamLogoUrl = (constructor) => {
  return `https://www.formula1.com/content/dam/fom-website/teams/2024/${constructor.constructorId}-logo.png.transform/2col/image.png`;
};

// Fetch current driver standings
export const fetchDriverStandings = async () => {
  try {
    const response = await f1Api.get('/driverStandings.json');
    const standingsData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    
    // Transform API data to match our app structure
    return standingsData.map(driver => ({
      id: driver.Driver.driverId.toUpperCase().substring(0,3),
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      team: driver.Constructors[0].name,
      points: parseFloat(driver.points),
      position: parseInt(driver.position),
      positionChange: 0, 
      imageUrl: getDriverImageUrl(driver.Driver)
    }));
  } catch (error) {
    console.error('Error fetching driver standings:', error);
    throw error;
  }
};

// Fetch current constructor standings
export const fetchConstructorStandings = async () => {
  try {
    const response = await f1Api.get('/constructorStandings.json');
    const standingsData = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    
    return standingsData.map(constructor => ({
      id: constructor.Constructor.constructorId.toUpperCase().substring(0,3),
      name: constructor.Constructor.name,
      points: parseFloat(constructor.points),
      position: parseInt(constructor.position),
      color: TEAM_COLORS[constructor.Constructor.constructorId] || '#888888',
      logoUrl: getTeamLogoUrl(constructor.Constructor)
    }));
  } catch (error) {
    console.error('Error fetching constructor standings:', error);
    throw error;
  }
};

// Fetch race results for the season
export const fetchSeasonResults = async () => {
  try {
    const response = await f1Api.get('/results.json?limit=1000');
    const races = response.data.MRData.RaceTable.Races;
    
    return races.map(race => ({
      race: race.raceName,
      round: parseInt(race.round),
      date: race.date,
      results: race.Results.map(result => ({
        driverId: result.Driver.driverId.toUpperCase().substring(0,3),
        position: parseInt(result.position)
      }))
    }));
  } catch (error) {
    console.error('Error fetching season results:', error);
    throw error;
  }
};

// Fetch all F1 data in a single call
export const fetchAllF1Data = async () => {
  try {
    const [drivers, constructors, seasonResults] = await Promise.all([
      fetchDriverStandings(),
      fetchConstructorStandings(),
      fetchSeasonResults()
    ]);
    
    return { drivers, constructors, seasonResults };
  } catch (error) {
    console.error('Error fetching all F1 data:', error);
    throw error;
  }
}; 