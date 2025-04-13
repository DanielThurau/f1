# F1 Stats Dashboard

A modern Formula 1 statistics dashboard built with React and Chakra UI. This application displays real-time F1 data including driver standings, constructor standings, and race results in an interactive and visually appealing way.

## Features

- 📊 Driver Championship Standings
- 🏆 Constructor Championship Standings
- 📈 Season Timeline with Race Results
- 🎨 Team-colored UI elements for better visual recognition
- 📱 Responsive design that works on desktop and mobile

## Tech Stack

- React 19
- Vite 6
- Chakra UI for component styling
- Recharts for data visualization
- Axios for API requests
- F1 Ergast API & F1 Website for data

## Architecture

The application follows a clean, modular architecture:

- `components/`: UI components for displaying data
- `services/`: Data fetching and processing logic
- `data/`: Static and generated data files
- `scripts/`: Utility scripts for updating data

## Data Management

The application uses two primary data sources:

1. **Static data**: Pre-generated F1 data stored in JavaScript files
2. **API data**: Real-time data fetched from the Ergast F1 API

To update the static data, run:

```bash
npm run update-f1-data
```

This command executes a script that scrapes the latest F1 data and updates the `f1Data2025.js` file.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

## License

This project is licensed under the MIT License
