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

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // ... 18 more drivers (total 20)
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
    // ... 8 more constructors (total 10)
  ];

  const seasonResults = [
    {
      race: "Bahrain GP",
      round: 1,
      date: "2025-03-02",
      results: []
    },
    {
      race: "Saudi Arabian GP",
      round: 2,
      date: "2025-03-09",
      results: []
    },
    // ... more races
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
// Generated using the f1Scraper.js
// Last updated: ${new Date().toISOString()}

import { fetch2025F1Data } from '../services/f1Scraper';

// Default exported data (updated on ${new Date().toLocaleString()})
export const { drivers, constructors, seasonResults } = ${JSON.stringify(data, null, 2)};

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