# Weather Monitoring System

A real-time weather monitoring system that tracks weather conditions across multiple cities. The application provides temperature trends, alerts users when temperature exceeds a certain threshold, and displays weather data in an intuitive format.

## Features

- **Real-time Weather Data**: Fetches weather data for various cities using a weather API.
- **Temperature Alerts**: Notifies users when the temperature exceeds a specified threshold.
- **Data Visualization**: Displays temperature trends using line charts.
- **User-Friendly Interface**: Easy navigation with a dashboard that presents all relevant weather data.

## Tech Stack

- **Frontend**: React.js, Chart.js
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Styling**: CSS, Tailwind CSS

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
2. Navigate to the client and API directories and install dependencies:
```bash
cd client
npm install
cd ../api
npm install
```
## Running the Application
1. Using Dcoker
   ```bash
   docker-compose up
   ```
   The application will be accessible at http://localhost:3002 (client) and http://localhost:4000 (API).
2. Without Docker
   Start Backend
   ```bash
   cd api
   npm start
   ```
   Start Frontend
   ```bash
   cd client
   npm start
   ```
## Usage 
Navigate to http://localhost:3002 to view the weather dashboard.
