import axios from 'axios';
import { JSDOM } from 'jsdom';

// Base URLs for scraping
const F1_WEBSITE = 'https://www.formula1.com';
const DRIVERS_URL = `${F1_WEBSITE}/en/drivers.html`;
const TEAMS_URL = `${F1_WEBSITE}/en/teams.html`;
const RESULTS_URL = `${F1_WEBSITE}/en/results.html`;

// Team colors mapping for 2025 (update as teams change)
const TEAM_COLORS = {
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

/**
 * Scrapes the F1 website for current drivers data
 * @returns {Promise<Array>} Array of driver objects
 */
export const scrapeDrivers = async () => {
  try {
    const response = await axios.get(DRIVERS_URL);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    // Select all driver elements
    const driverElements = document.querySelectorAll('.listing-item--link');
    const drivers = [];
    
    driverElements.forEach((element, index) => {
      // Extract data from the DOM
      const name = element.querySelector('.listing-item--name').textContent.trim();
      const team = element.querySelector('.listing-item--team').textContent.trim();
      const imageUrl = element.querySelector('.listing-item--photo img').src;
      
      // Create driver ID from name (e.g., "Lewis Hamilton" -> "HAM")
      const nameParts = name.split(' ');
      const lastName = nameParts[nameParts.length - 1];
      const driverId = lastName.substring(0, 3).toUpperCase();
      
      drivers.push({
        id: driverId,
        name: name,
        team: team,
        points: 0, // Initialize with 0 for new season
        position: index + 1,
        positionChange: 0,
        imageUrl: imageUrl.startsWith('http') ? imageUrl : `${F1_WEBSITE}${imageUrl}`
      });
    });
    
    return drivers;
  } catch (error) {
    console.error('Error scraping drivers data:', error);
    throw error;
  }
};

/**
 * Scrapes the F1 website for current teams data
 * @returns {Promise<Array>} Array of constructor objects
 */
export const scrapeConstructors = async () => {
  try {
    const response = await axios.get(TEAMS_URL);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    // Select all team elements
    const teamElements = document.querySelectorAll('.listing-item--team');
    const constructors = [];
    
    teamElements.forEach((element, index) => {
      // Extract data from the DOM
      const name = element.querySelector('.listing-item--name').textContent.trim();
      const logoUrl = element.querySelector('.listing-item--photo img').src;
      
      // Create team ID
      const teamId = name.replace(/\s+/g, '_').toLowerCase();
      const constructorId = teamId.substring(0, 3).toUpperCase();
      
      constructors.push({
        id: constructorId,
        name: name,
        points: 0, // Initialize with 0 for new season
        position: index + 1,
        color: TEAM_COLORS[teamId] || '#888888',
        logoUrl: logoUrl.startsWith('http') ? logoUrl : `${F1_WEBSITE}${logoUrl}`
      });
    });
    
    return constructors;
  } catch (error) {
    console.error('Error scraping constructors data:', error);
    throw error;
  }
};

/**
 * Scrapes race results from the F1 website
 * @returns {Promise<Array>} Array of race results
 */
export const scrapeRaceResults = async () => {
  try {
    const response = await axios.get(RESULTS_URL);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    // Select race elements
    const raceElements = document.querySelectorAll('.race-results');
    const seasonResults = [];
    
    raceElements.forEach((element, raceIndex) => {
      const raceName = element.querySelector('.race-title').textContent.trim();
      const raceDate = element.querySelector('.race-date').textContent.trim();
      
      // Extract results table
      const resultRows = element.querySelectorAll('.results-table tbody tr');
      const results = [];
      
      resultRows.forEach(row => {
        const position = parseInt(row.querySelector('.position').textContent.trim());
        const driverName = row.querySelector('.driver-name').textContent.trim();
        
        // Create driver ID from name
        const nameParts = driverName.split(' ');
        const lastName = nameParts[nameParts.length - 1];
        const driverId = lastName.substring(0, 3).toUpperCase();
        
        results.push({
          driverId: driverId,
          position: position
        });
      });
      
      seasonResults.push({
        race: raceName,
        round: raceIndex + 1,
        date: raceDate,
        results: results
      });
    });
    
    return seasonResults;
  } catch (error) {
    console.error('Error scraping race results:', error);
    throw error;
  }
};

/**
 * Generate mock data if scraping is not possible (e.g., before season starts)
 * @returns {Object} Object containing mock drivers, constructors and race data
 */
export const generateMockData = () => {
  const drivers = [
    {
      id: "VER",
      name: "Max Verstappen",
      team: "Red Bull Racing",
      points: 0,
      position: 1,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png"
    },
    {
      id: "NOR",
      name: "Lando Norris",
      team: "McLaren",
      points: 0,
      position: 2,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png"
    },
    {
      id: "LEC",
      name: "Charles Leclerc",
      team: "Ferrari",
      points: 0,
      position: 3,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png"
    },
    {
      id: "PER",
      name: "Sergio Perez",
      team: "Red Bull Racing",
      points: 0,
      position: 4,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png"
    },
    {
      id: "SAI",
      name: "Carlos Sainz",
      team: "Williams",
      points: 0,
      position: 5,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png"
    },
    {
      id: "RUS",
      name: "George Russell",
      team: "Mercedes",
      points: 0,
      position: 6,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png"
    },
    {
      id: "HAM",
      name: "Lewis Hamilton",
      team: "Ferrari",
      points: 0,
      position: 7,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png"
    },
    {
      id: "PIA",
      name: "Oscar Piastri",
      team: "McLaren",
      points: 0,
      position: 8,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png"
    },
    {
      id: "ALO",
      name: "Fernando Alonso",
      team: "Aston Martin",
      points: 0,
      position: 9,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png"
    },
    {
      id: "BEA",
      name: "Franco Bearman",
      team: "Haas F1 Team",
      points: 0,
      position: 10,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/2col/image.png"
    },
    {
      id: "STR",
      name: "Lance Stroll",
      team: "Aston Martin",
      points: 0,
      position: 11,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png"
    },
    {
      id: "LAW",
      name: "Liam Lawson",
      team: "RB",
      points: 0,
      position: 12,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col/image.png"
    },
    {
      id: "ALB",
      name: "Alexander Albon",
      team: "Williams",
      points: 0,
      position: 13,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png"
    },
    {
      id: "GAS",
      name: "Pierre Gasly",
      team: "Alpine",
      points: 0,
      position: 14,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png"
    },
    {
      id: "OCO",
      name: "Esteban Ocon",
      team: "Haas F1 Team",
      points: 0,
      position: 15,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png"
    },
    {
      id: "HUL",
      name: "Nico Hulkenberg",
      team: "Sauber",
      points: 0,
      position: 16,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png"
    },
    {
      id: "TSU",
      name: "Yuki Tsunoda",
      team: "RB",
      points: 0,
      position: 17,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png"
    },
    {
      id: "ZHO",
      name: "Zhou Guanyu",
      team: "Sauber",
      points: 0,
      position: 18,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png.transform/2col/image.png"
    },
    {
      id: "DOO",
      name: "Jack Doohan",
      team: "Alpine",
      points: 0,
      position: 19,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png.transform/2col/image.png"
    },
    {
      id: "MAG",
      name: "Kevin Magnussen",
      team: "Haas F1 Team",
      points: 0,
      position: 20,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/2col/image.png"
    }
  ];

  const constructors = [
    {
      id: "RBR",
      name: "Red Bull Racing",
      points: 0,
      position: 1,
      color: "#0600EF",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col/image.png"
    },
    {
      id: "MCL",
      name: "McLaren",
      points: 0,
      position: 2,
      color: "#FF8700",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png.transform/2col/image.png"
    },
    {
      id: "FER",
      name: "Ferrari",
      points: 0,
      position: 3,
      color: "#DC0000",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png"
    },
    {
      id: "MER",
      name: "Mercedes",
      points: 0,
      position: 4,
      color: "#00D2BE",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png.transform/2col/image.png"
    },
    {
      id: "AST",
      name: "Aston Martin",
      points: 0,
      position: 5,
      color: "#006F62",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png.transform/2col/image.png"
    },
    {
      id: "ALP",
      name: "Alpine",
      points: 0,
      position: 6,
      color: "#0090FF",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png.transform/2col/image.png"
    },
    {
      id: "HAA",
      name: "Haas F1 Team",
      points: 0,
      position: 7,
      color: "#FFFFFF",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png.transform/2col/image.png"
    },
    {
      id: "WIL",
      name: "Williams",
      points: 0,
      position: 8,
      color: "#005AFF",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png.transform/2col/image.png"
    },
    {
      id: "RB",
      name: "RB",
      points: 0,
      position: 9,
      color: "#1E41FF",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png.transform/2col/image.png"
    },
    {
      id: "SAU",
      name: "Sauber",
      points: 0,
      position: 10,
      color: "#900000",
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/sauber-logo.png.transform/2col/image.png"
    }
  ];

  // Empty race schedule for the 2025 season (placeholder)
  const seasonResults = [
    {
      race: "Bahrain GP",
      round: 1,
      date: "2025-03-02", // Placeholder date
      results: []
    },
    {
      race: "Saudi Arabian GP",
      round: 2,
      date: "2025-03-09", // Placeholder date
      results: []
    },
    {
      race: "Australian GP",
      round: 3,
      date: "2025-03-23", // Placeholder date
      results: []
    },
    {
      race: "Japanese GP",
      round: 4,
      date: "2025-04-06", // Placeholder date
      results: []
    },
    {
      race: "Chinese GP",
      round: 5,
      date: "2025-04-20", // Placeholder date
      results: []
    },
    {
      race: "Miami GP",
      round: 6,
      date: "2025-05-04", // Placeholder date
      results: []
    },
    {
      race: "Emilia Romagna GP",
      round: 7,
      date: "2025-05-18", // Placeholder date
      results: []
    },
    {
      race: "Monaco GP",
      round: 8,
      date: "2025-05-25", // Placeholder date
      results: []
    }
  ];

  return { drivers, constructors, seasonResults };
};

/**
 * Fetches 2025 F1 data - tries scraping first, falls back to mock data
 * @returns {Promise<Object>} Object containing drivers, constructors and race data
 */
export const fetch2025F1Data = async () => {
  try {
    // Try to scrape data
    const drivers = await scrapeDrivers();
    const constructors = await scrapeConstructors();
    const seasonResults = await scrapeRaceResults();
    
    return { drivers, constructors, seasonResults };
  } catch (error) {
    console.warn('Scraping failed, falling back to mock data', error);
    // If scraping fails (likely before season starts), return mock data
    return generateMockData();
  }
}; 