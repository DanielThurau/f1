import axios from 'axios';

const BASE_URL = 'https://ergast.com/api/f1/current';

// Fetch current driver standings
export const fetchDriverStandings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/driverStandings.json`);
    console.log("DRIVER STANDINGS", JSON.stringify(response.data, null, 2));
    const standingsData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    
    // Transform API data to match our app structure
    return standingsData.map(driver => ({
      id: driver.Driver.driverId.toUpperCase(),
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      team: driver.Constructors[0].name,
      points: parseFloat(driver.points),
      position: parseInt(driver.position),
      positionChange: 0, // API doesn't provide position change
      imageUrl: `https://www.formula1.com/content/dam/fom-website/drivers/${driver.Driver.driverId.charAt(0).toUpperCase()}/${driver.Driver.driverId.toUpperCase().substring(0,3)}${driver.Driver.permanentNumber}01_${driver.Driver.givenName}_${driver.Driver.familyName}/${driver.Driver.driverId}.png.transform/2col/image.png`
    }));
  } catch (error) {
    console.error('Error fetching driver standings:', error);
    throw error;
  }
};

// Fetch current constructor standings
export const fetchConstructorStandings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/constructorStandings.json`);
    console.log("CONSTRUCTOR STANDINGS", JSON.stringify(response.data, null, 2));
    const standingsData = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    
    // Team colors mapping
    const teamColors = {
      'red_bull': '#0600EF',
      'mclaren': '#FF8700',
      'ferrari': '#DC0000',
      'mercedes': '#00D2BE',
      'aston_martin': '#006F62',
      'alpine': '#0090FF',
      'haas': '#FFFFFF',
      'williams': '#005AFF',
      'rb': '#1E41FF',
      'sauber': '#900000',
    };
    
    return standingsData.map(constructor => ({
      id: constructor.Constructor.constructorId.toUpperCase(),
      name: constructor.Constructor.name,
      points: parseFloat(constructor.points),
      position: parseInt(constructor.position),
      color: teamColors[constructor.Constructor.constructorId] || '#888888',
      logoUrl: `https://www.formula1.com/content/dam/fom-website/teams/2024/${constructor.Constructor.constructorId}-logo.png.transform/2col/image.png`
    }));
  } catch (error) {
    console.error('Error fetching constructor standings:', error);
    throw error;
  }
};

// Fetch race results for the season
export const fetchSeasonResults = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/results.json?limit=1000`);
    console.log("RACES", JSON.stringify(response.data, null, 2));
    const races = response.data.MRData.RaceTable.Races;
    return races.map(race => ({
      race: race.raceName,
      round: parseInt(race.round),
      date: race.date,
      results: race.Results.map(result => ({
        driverId: result.Driver.driverId.toUpperCase(),
        position: parseInt(result.position)
      }))
    }));
  } catch (error) {
    console.error('Error fetching season results:', error);
    throw error;
  }
}; 