// This file contains F1 data for the 2025 season
// Generated using the update-f1-data.js script
// Last updated: 2024-07-14T00:00:00.000Z

import { fetch2025F1Data } from '../services/f1Scraper';

// Default exported data (updated on 7/14/2024)
export const drivers = [
  {
    id: "NOR",
    name: "Lando Norris",
    team: "McLaren",
    points: 77,
    position: 1,
    positionChange: 1,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png"
  },
  {
    id: "PIA",
    name: "Oscar Piastri",
    team: "McLaren",
    points: 74,
    position: 2,
    positionChange: 2,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png"
  },
  {
    id: "VER",
    name: "Max Verstappen",
    team: "Red Bull Racing",
    points: 69,
    position: 3,
    positionChange: -2,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png"
  },
  {
    id: "RUS",
    name: "George Russell",
    team: "Mercedes",
    points: 63,
    position: 4,
    positionChange: 2,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png"
  },
  {
    id: "LEC",
    name: "Charles Leclerc",
    team: "Ferrari",
    points: 32,
    position: 5,
    positionChange: -2,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png"
  },
  {
    id: "ANT",
    name: "Andrea Kimi Antonelli",
    team: "Mercedes",
    points: 30,
    position: 6,
    positionChange: 0,
    imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/ANDANT01_Kimi_Antonelli/andant01.png"
  },
  {
    id: "HAM",
    name: "Lewis Hamilton",
    team: "Ferrari",
    points: 25,
    position: 7,
    positionChange: 0,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png"
  },
  {
    id: "ALB",
    name: "Alexander Albon",
    team: "Williams",
    points: 18,
    position: 8,
    positionChange: 8,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png"
  },
  {
    id: "OCO",
    name: "Esteban Ocon",
    team: "Haas",
    points: 14,
    position: 9,
    positionChange: 5,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png"
  },
  {
    id: "STR",
    name: "Lance Stroll",
    team: "Aston Martin",
    points: 10,
    position: 10,
    positionChange: 3,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png"
  },
  {
    id: "GAS",
    name: "Pierre Gasly",
    team: "Alpine",
    points: 6,
    position: 11,
    positionChange: -1,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png"
  },
  {
    id: "HUL",
    name: "Nico Hulkenberg",
    team: "Kick Sauber",
    points: 6,
    position: 12,
    positionChange: -1,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png"
  },
  {
    id: "BEA",
    name: "Oliver Bearman",
    team: "Haas",
    points: 6,
    position: 13,
    positionChange: 5,
    imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png"
  },
  {
    id: "TSU",
    name: "Yuki Tsunoda",
    team: "Racing Bulls",
    points: 5,
    position: 14,
    positionChange: -2,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png"
  },
  {
    id: "HAD",
    name: "Isack Hadjar",
    team: "Racing Bulls",
    points: 4,
    position: 15,
    positionChange: 0,
    imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png"
  },
  {
    id: "SAI",
    name: "Carlos Sainz",
    team: "Williams",
    points: 1,
    position: 16,
    positionChange: -11,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png"
  },
  {
    id: "ALO",
    name: "Fernando Alonso",
    team: "Aston Martin",
    points: 0,
    position: 17,
    positionChange: -8,
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png"
  },
  {
    id: "LAW",
    name: "Liam Lawson",
    team: "Racing Bulls",
    points: 0,
    position: 18,
    positionChange: 3,
    imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png"
  },
  {
    id: "DOO",
    name: "Jack Doohan",
    team: "Alpine",
    points: 0,
    position: 19,
    positionChange: 5,
    imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png"
  },
  {
    id: "BOR",
    name: "Gabriel Bortoleto",
    team: "Kick Sauber",
    points: 0,
    position: 20,
    positionChange: 0,
    imageUrl: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png"
  }
];

export const constructors = [
  {
    id: "MCL",
    name: "McLaren",
    points: 151,
    position: 1,
    color: "#FF8700",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col/image.png"
  },
  {
    id: "MER",
    name: "Mercedes",
    points: 93,
    position: 2,
    color: "#00D2BE",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col/image.png"
  },
  {
    id: "RBR",
    name: "Red Bull Racing",
    points: 71,
    position: 3,
    color: "#0600EF",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col/image.png"
  },
  {
    id: "FER",
    name: "Ferrari",
    points: 57,
    position: 4,
    color: "#DC0000",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col/image.png"
  },
  {
    id: "HAA",
    name: "Haas",
    points: 20,
    position: 5,
    color: "#FFFFFF",
    logoUrl: "https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png"
  },
  {
    id: "WIL",
    name: "Williams",
    points: 19,
    position: 6,
    color: "#005AFF",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png.transform/2col/image.png"
  },
  {
    id: "AST",
    name: "Aston Martin",
    points: 10,
    position: 7,
    color: "#006F62",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col/image.png"
  },
  {
    id: "RB",
    name: "Racing Bulls",
    points: 7,
    position: 8,
    color: "#1E41FF",
    logoUrl: "https://media.formula1.com/content/dam/fom-website/teams/2025/racing-bulls-logo.png"
  },
  {
    id: "ALP",
    name: "Alpine",
    points: 6,
    position: 9,
    color: "#0090FF",
    logoUrl: "https://www.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col/image.png"
  },
  {
    id: "SAU",
    name: "Kick Sauber",
    points: 6,
    position: 10,
    color: "#900000",
    logoUrl: "https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber-logo.png"
  }
];

export const seasonResults = [
  {
    race: "Australian GP",
    round: 1,
    date: "2025-03-16",
    results: [
      { driverId: "NOR", position: 1 },
      { driverId: "VER", position: 2 },
      { driverId: "RUS", position: 3 },
      { driverId: "ANT", position: 4 },
      { driverId: "ALB", position: 5 },
      { driverId: "STR", position: 6 },
      { driverId: "HUL", position: 7 },
      { driverId: "LEC", position: 8 },
      { driverId: "PIA", position: 9 },
      { driverId: "HAM", position: 10 },
      { driverId: "GAS", position: 11 },
      { driverId: "TSU", position: 12 },
      { driverId: "OCO", position: 13 },
      { driverId: "BEA", position: 14 },
      { driverId: "LAW", position: 15 },
      { driverId: "BOR", position: 16 },
      { driverId: "ALO", position: 17 },
      { driverId: "SAI", position: 18 },
      { driverId: "DOO", position: 19 },
      { driverId: "HAD", position: 20 }
    ]
  },
  {
    race: "Chinese GP",
    round: 2,
    date: "2025-03-23",
    results: [
      { driverId: "PIA", position: 1 },
      { driverId: "NOR", position: 2 },
      { driverId: "RUS", position: 3 },
      { driverId: "VER", position: 4 },
      { driverId: "OCO", position: 5 },
      { driverId: "ANT", position: 6 },
      { driverId: "ALB", position: 7 },
      { driverId: "BEA", position: 8 },
      { driverId: "STR", position: 9 },
      { driverId: "SAI", position: 10 },
      { driverId: "HAD", position: 11 },
      { driverId: "LAW", position: 12 },
      { driverId: "DOO", position: 13 },
      { driverId: "BOR", position: 14 },
      { driverId: "HUL", position: 15 },
      { driverId: "TSU", position: 16 },
      { driverId: "ALO", position: 17 },
      { driverId: "LEC", position: 18 },
      { driverId: "HAM", position: 19 },
      { driverId: "GAS", position: 20 }
    ]
  },
  {
    race: "Japanese GP",
    round: 3,
    date: "2025-04-06",
    results: [
      { driverId: "VER", position: 1 },
      { driverId: "NOR", position: 2 },
      { driverId: "PIA", position: 3 },
      { driverId: "LEC", position: 4 },
      { driverId: "RUS", position: 5 },
      { driverId: "ANT", position: 6 },
      { driverId: "HAM", position: 7 },
      { driverId: "HAD", position: 8 },
      { driverId: "ALB", position: 9 },
      { driverId: "BEA", position: 10 },
      { driverId: "ALO", position: 11 },
      { driverId: "TSU", position: 12 },
      { driverId: "GAS", position: 13 },
      { driverId: "SAI", position: 14 },
      { driverId: "DOO", position: 15 },
      { driverId: "HUL", position: 16 },
      { driverId: "LAW", position: 17 },
      { driverId: "OCO", position: 18 },
      { driverId: "BOR", position: 19 },
      { driverId: "STR", position: 20 }
    ]
  },
  {
    race: "Bahrain GP",
    round: 4,
    date: "2025-04-13",
    results: [
      { driverId: "PIA", position: 1 },
      { driverId: "RUS", position: 2 },
      { driverId: "NOR", position: 3 },
      { driverId: "LEC", position: 4 },
      { driverId: "HAM", position: 5 },
      { driverId: "VER", position: 6 },
      { driverId: "GAS", position: 7 },
      { driverId: "OCO", position: 8 },
      { driverId: "TSU", position: 9 },
      { driverId: "BEA", position: 10 },
      { driverId: "ANT", position: 11 },
      { driverId: "ALB", position: 12 },
      { driverId: "HUL", position: 13 },
      { driverId: "HAD", position: 14 },
      { driverId: "DOO", position: 15 },
      { driverId: "ALO", position: 16 },
      { driverId: "LAW", position: 17 },
      { driverId: "STR", position: 18 },
      { driverId: "BOR", position: 19 },
      { driverId: "SAI", position: 20 }
    ]
  }
];

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
}; 