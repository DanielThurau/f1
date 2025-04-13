#!/usr/bin/env node

/**
 * This script updates the F1 data for the 2025 season
 * It fetches data from Formula 1 website and updates the f1Data2025.js file
 */

import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TEAM_COLORS } from '../src/services/f1Api.js';

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URLs for scraping
const F1_WEBSITE = 'https://www.formula1.com';
const DRIVERS_URL = `${F1_WEBSITE}/en/drivers.html`;
const TEAMS_URL = `${F1_WEBSITE}/en/teams.html`;
const RESULTS_URL = `${F1_WEBSITE}/en/results.html`;

/**
 * Scrapes the F1 website for current drivers data
 * @returns {Promise<Array>} Array of driver objects
 */
async function scrapeDrivers() {
  try {
    console.log('Scraping drivers data...');
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
    
    console.log(`Found ${drivers.length} drivers`);
    
    // If we didn't find enough drivers, fill in with mock data
    if (drivers.length < 20) {
      console.log(`Only found ${drivers.length} drivers, adding mock drivers to reach 20`);
      
      // Get mock data for missing drivers
      const mockDrivers = generateMockData().drivers;
      const existingIds = new Set(drivers.map(d => d.id));
      
      // Add drivers from mock data until we have 20
      let position = drivers.length + 1;
      for (let i = 0; i < mockDrivers.length && drivers.length < 20; i++) {
        const mockDriver = mockDrivers[i];
        if (!existingIds.has(mockDriver.id)) {
          drivers.push({
            ...mockDriver,
            position: position++,
            points: 0,
            positionChange: 0
          });
          existingIds.add(mockDriver.id);
        }
      }
      
      console.log(`Added ${20 - drivers.length} mock drivers to reach 20 total`);
    } else if (drivers.length > 20) {
      // If we somehow got more than 20, trim to 20
      console.log(`Found ${drivers.length} drivers, trimming to 20`);
      drivers.splice(20);
    }
    
    // Make sure positions are 1-20
    drivers.forEach((driver, index) => {
      driver.position = index + 1;
    });
    
    return drivers;
  } catch (error) {
    console.error('Error scraping drivers data:', error);
    return null;
  }
}

/**
 * Scrapes the F1 website for current teams data
 * @returns {Promise<Array>} Array of constructor objects
 */
async function scrapeConstructors() {
  try {
    console.log('Scraping constructors data...');
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
    
    console.log(`Found ${constructors.length} constructors`);
    
    // If we didn't find enough constructors, fill in with mock data
    if (constructors.length < 10) {
      console.log(`Only found ${constructors.length} constructors, adding mock constructors to reach 10`);
      
      // Get mock data for missing constructors
      const mockConstructors = generateMockData().constructors;
      const existingIds = new Set(constructors.map(c => c.id));
      
      // Add constructors from mock data until we have 10
      let position = constructors.length + 1;
      for (let i = 0; i < mockConstructors.length && constructors.length < 10; i++) {
        const mockConstructor = mockConstructors[i];
        if (!existingIds.has(mockConstructor.id)) {
          constructors.push({
            ...mockConstructor,
            position: position++,
            points: 0
          });
          existingIds.add(mockConstructor.id);
        }
      }
      
      console.log(`Added ${10 - constructors.length} mock constructors to reach 10 total`);
    } else if (constructors.length > 10) {
      // If we somehow got more than 10, trim to 10
      console.log(`Found ${constructors.length} constructors, trimming to 10`);
      constructors.splice(10);
    }
    
    // Make sure positions are 1-10
    constructors.forEach((constructor, index) => {
      constructor.position = index + 1;
    });
    
    return constructors;
  } catch (error) {
    console.error('Error scraping constructors data:', error);
    return null;
  }
}

/**
 * Scrapes race results from the F1 website
 * @returns {Promise<Array>} Array of race results
 */
async function scrapeRaceResults() {
  try {
    console.log('Scraping race results...');
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
    
    console.log(`Found ${seasonResults.length} races`);
    
    // If we didn't find any races, create mock race data
    if (seasonResults.length === 0) {
      console.log('No races found, generating mock race data');
      return generateMockData().seasonResults;
    }
    
    // Get all driver IDs from mock data to ensure we have a complete set
    const mockDrivers = generateMockData().drivers;
    const allDriverIds = mockDrivers.map(d => d.id);
    
    // Ensure all races have results for all 20 drivers
    seasonResults.forEach(race => {
      // Create a map of existing driver positions
      const driverPositions = new Map();
      race.results.forEach(result => {
        driverPositions.set(result.driverId, result.position);
      });
      
      // Check if we have all drivers
      if (race.results.length < 20) {
        console.log(`Race ${race.race} has only ${race.results.length} results, adding missing drivers`);
        
        // Find maximum position used
        let maxPosition = 0;
        race.results.forEach(result => {
          maxPosition = Math.max(maxPosition, result.position);
        });
        
        // Add missing drivers
        allDriverIds.forEach(driverId => {
          if (!driverPositions.has(driverId)) {
            maxPosition++;
            race.results.push({
              driverId: driverId,
              position: maxPosition
            });
          }
        });
        
        // Sort results by position
        race.results.sort((a, b) => a.position - b.position);
      }
    });
    
    return seasonResults;
  } catch (error) {
    console.error('Error scraping race results:', error);
    return null;
  }
}

/**
 * Generate mock data if scraping is not possible
 */
function generateMockData() {
  console.log('Generating mock data...');
  // This is placeholder data based on 2024 season with some changes for 2025
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
      id: "PIA",
      name: "Oscar Piastri",
      team: "McLaren",
      points: 0,
      position: 4,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png"
    },
    {
      id: "RUS",
      name: "George Russell",
      team: "Mercedes",
      points: 0,
      position: 5,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png"
    },
    {
      id: "HAM",
      name: "Lewis Hamilton",
      team: "Ferrari",
      points: 0,
      position: 6,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png"
    },
    {
      id: "SAI",
      name: "Carlos Sainz",
      team: "Williams",
      points: 0,
      position: 7,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png"
    },
    {
      id: "ALO",
      name: "Fernando Alonso",
      team: "Aston Martin",
      points: 0,
      position: 8,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png"
    },
    {
      id: "STR",
      name: "Lance Stroll",
      team: "Aston Martin",
      points: 0,
      position: 9,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png"
    },
    {
      id: "PER",
      name: "Sergio Perez",
      team: "Red Bull Racing",
      points: 0,
      position: 10,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png"
    },
    {
      id: "ALB",
      name: "Alexander Albon",
      team: "Williams",
      points: 0,
      position: 11,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png"
    },
    {
      id: "GAS",
      name: "Pierre Gasly",
      team: "Alpine",
      points: 0,
      position: 12,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png"
    },
    {
      id: "OCO",
      name: "Esteban Ocon",
      team: "Haas F1 Team",
      points: 0,
      position: 13,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png"
    },
    {
      id: "HUL",
      name: "Nico Hulkenberg",
      team: "Sauber",
      points: 0,
      position: 14,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png"
    },
    {
      id: "ANT",
      name: "Andrea Kimi Antonelli",
      team: "Mercedes",
      points: 0,
      position: 15,
      positionChange: 0,
      imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/ANDANT01_Kimi_Antonelli/andant01.png"
    },
    {
      id: "BEA",
      name: "Oliver Bearman",
      team: "Haas F1 Team",
      points: 0,
      position: 16,
      positionChange: 0,
      imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png"
    },
    {
      id: "TSU",
      name: "Yuki Tsunoda",
      team: "Racing Bulls",
      points: 0,
      position: 17,
      positionChange: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png"
    },
    {
      id: "LAW",
      name: "Liam Lawson",
      team: "Racing Bulls",
      points: 0,
      position: 18,
      positionChange: 0,
      imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png"
    },
    {
      id: "DOO",
      name: "Jack Doohan",
      team: "Alpine",
      points: 0,
      position: 19,
      positionChange: 0,
      imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png"
    },
    {
      id: "BOR",
      name: "Gabriel Bortoleto",
      team: "Sauber",
      points: 0,
      position: 20,
      positionChange: 0,
      imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png"
    }
  ];

  const constructors = [
    {
      id: "RBR",
      name: "Red Bull Racing",
      points: 0,
      position: 1,
      color: TEAM_COLORS.red_bull,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col/image.png"
    },
    {
      id: "MCL",
      name: "McLaren",
      points: 0,
      position: 2,
      color: TEAM_COLORS.mclaren,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png.transform/2col/image.png"
    },
    {
      id: "FER",
      name: "Ferrari",
      points: 0,
      position: 3,
      color: TEAM_COLORS.ferrari,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png"
    },
    {
      id: "MER",
      name: "Mercedes",
      points: 0,
      position: 4,
      color: TEAM_COLORS.mercedes,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png.transform/2col/image.png"
    },
    {
      id: "AST",
      name: "Aston Martin",
      points: 0,
      position: 5,
      color: TEAM_COLORS.aston_martin,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png.transform/2col/image.png"
    },
    {
      id: "ALP",
      name: "Alpine",
      points: 0,
      position: 6,
      color: TEAM_COLORS.alpine,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png.transform/2col/image.png"
    },
    {
      id: "HAA",
      name: "Haas F1 Team",
      points: 0,
      position: 7,
      color: TEAM_COLORS.haas,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png.transform/2col/image.png"
    },
    {
      id: "WIL",
      name: "Williams",
      points: 0,
      position: 8,
      color: TEAM_COLORS.williams,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png.transform/2col/image.png"
    },
    {
      id: "RB",
      name: "Racing Bulls",
      points: 0,
      position: 9,
      color: TEAM_COLORS.rb,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png.transform/2col/image.png"
    },
    {
      id: "SAU",
      name: "Kick Sauber",
      points: 0,
      position: 10,
      color: TEAM_COLORS.sauber,
      logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2024/sauber-logo.png.transform/2col/image.png"
    }
  ];

  const seasonResults = [
    {
      race: "Bahrain GP",
      round: 1,
      date: "2025-03-02",
      results: Array.from({ length: 20 }, (_, i) => ({
        driverId: drivers[i].id,
        position: i + 1
      }))
    },
    {
      race: "Saudi Arabian GP",
      round: 2,
      date: "2025-03-09",
      results: Array.from({ length: 20 }, (_, i) => ({
        driverId: drivers[i].id,
        position: i + 1
      }))
    },
    {
      race: "Australian GP",
      round: 3,
      date: "2025-03-23",
      results: Array.from({ length: 20 }, (_, i) => ({
        driverId: drivers[i].id,
        position: i + 1
      }))
    },
    {
      race: "Japanese GP",
      round: 4,
      date: "2025-04-06",
      results: Array.from({ length: 20 }, (_, i) => ({
        driverId: drivers[i].id,
        position: i + 1
      }))
    }
  ];

  return { drivers, constructors, seasonResults };
}

/**
 * Updates the F1 data file
 */
async function updateF1DataFile() {
  console.log('Starting F1 data update process...');
  
  let data;
  
  try {
    // Try scraping from website
    const drivers = await scrapeDrivers();
    const constructors = await scrapeConstructors();
    const seasonResults = await scrapeRaceResults();
    
    if (drivers && constructors && seasonResults) {
      data = { drivers, constructors, seasonResults };
      console.log('Successfully scraped F1 data from website');
    } else {
      // If any scraping fails, use mock data
      data = generateMockData();
      console.log('Using mock data as fallback');
    }
    
    // Path to the data file
    const dataFilePath = path.resolve(__dirname, '../src/data/f1Data2025.js');
    
    // Create updated file content
    const updatedContent = `// This file contains F1 data for the 2025 season
// Generated using the update-f1-data.js script
// Last updated: ${new Date().toISOString()}

import { fetch2025F1Data } from '../services/f1Scraper';

// Default exported data (updated on ${new Date().toLocaleString()})
export const drivers = ${JSON.stringify(data.drivers, null, 2)};

export const constructors = ${JSON.stringify(data.constructors, null, 2)};

export const seasonResults = ${JSON.stringify(data.seasonResults, null, 2)};

// Function to update the 2025 F1 data in this file
export const updateF1Data = async () => {
  try {
    const data = await fetch2025F1Data();
    console.log('Successfully updated 2025 F1 data', data);
    return data;
  } catch (error) {
    console.error('Failed to update 2025 F1 data', error);
    return { drivers, constructors, seasonResults };
  }
};`;
    
    // Write the updated file
    fs.writeFileSync(dataFilePath, updatedContent);
    
    console.log(`F1 data file updated successfully: ${dataFilePath}`);
  } catch (error) {
    console.error('Error updating F1 data file:', error);
  }
}

// Run the update process
updateF1DataFile(); 