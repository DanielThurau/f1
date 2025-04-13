import axios from 'axios';
import { TEAM_COLORS } from './f1Api';

// Create an API client for fetching F1 data
const f1Api = axios.create({
  baseURL: 'https://www.formula1.com/en',
  timeout: 10000,
});

/**
 * Fetch and process driver data from the F1 API
 * This is a client-side implementation using data from Formula 1 website
 */
export async function fetchDriverData() {
  try {
    const response = await f1Api.get('/drivers.html');
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    const driverElements = doc.querySelectorAll('.listing-item--link');
    const drivers = [];

    driverElements.forEach((element, index) => {
      const name = element.querySelector('.listing-item--name').textContent.trim();
      const team = element.querySelector('.listing-item--team').textContent.trim();
      const imageUrl = element.querySelector('.listing-item--photo img').src;

      const nameParts = name.split(' ');
      const lastName = nameParts[nameParts.length - 1];
      const driverId = lastName.substring(0, 3).toUpperCase();

      drivers.push({
        id: driverId,
        name: name,
        team: team,
        points: 0,
        position: index + 1,
        positionChange: 0,
        imageUrl: imageUrl,
      });
    });

    return drivers;
  } catch (error) {
    console.error('Error fetching driver data:', error);
    throw error;
  }
}

/**
 * Fetch and process constructor data from the F1 API
 */
export async function fetchConstructorData() {
  try {
    const response = await f1Api.get('/teams.html');
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    const teamElements = doc.querySelectorAll('.listing-item--team');
    const constructors = [];

    teamElements.forEach((element, index) => {
      const name = element.querySelector('.listing-item--name').textContent.trim();
      const logoUrl = element.querySelector('.listing-item--photo img').src;

      const teamId = name.replace(/\s+/g, '_').toLowerCase();
      const constructorId = teamId.substring(0, 3).toUpperCase();

      constructors.push({
        id: constructorId,
        name: name,
        points: 0,
        position: index + 1,
        color: TEAM_COLORS[teamId] || '#888888',
        logoUrl: logoUrl,
      });
    });

    return constructors;
  } catch (error) {
    console.error('Error fetching constructor data:', error);
    throw error;
  }
}

/**
 * Fetch and process race result data from the F1 API
 */
export async function fetchRaceResults() {
  try {
    const response = await f1Api.get('/results.html');
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    const raceElements = doc.querySelectorAll('.race-results');
    const seasonResults = [];

    raceElements.forEach((element, raceIndex) => {
      const raceName = element.querySelector('.race-title').textContent.trim();
      const raceDate = element.querySelector('.race-date').textContent.trim();

      const resultRows = element.querySelectorAll('.results-table tbody tr');
      const results = [];

      resultRows.forEach(row => {
        const position = parseInt(row.querySelector('.position').textContent.trim());
        const driverName = row.querySelector('.driver-name').textContent.trim();

        const nameParts = driverName.split(' ');
        const lastName = nameParts[nameParts.length - 1];
        const driverId = lastName.substring(0, 3).toUpperCase();

        results.push({
          driverId: driverId,
          position: position,
        });
      });

      seasonResults.push({
        race: raceName,
        round: raceIndex + 1,
        date: raceDate,
        results: results,
      });
    });

    return seasonResults;
  } catch (error) {
    console.error('Error fetching race results:', error);
    throw error;
  }
}

/**
 * Fetch all F1 data for 2025 season
 * Note: This function uses the browser's DOMParser, so it's meant for client-side use
 */
export async function fetch2025F1Data() {
  try {
    // For client-side, we'll rely on the Ergast API instead of scraping
    // This is a fallback for when the update-f1-data.js script hasn't been run recently
    const { fetchAllF1Data } = await import('./f1Api');
    return fetchAllF1Data();
  } catch (error) {
    console.error('Error fetching 2025 F1 data:', error);
    throw error;
  }
}
