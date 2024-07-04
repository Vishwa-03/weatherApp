import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudIcon from "@mui/icons-material/Cloud";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import TemperatureChart from "./components/TemperatureChart";
import { fetchWeather, fetchForecast } from "./api/weather";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4b0082",  // Indigo color
    },
    secondary: {
      main: "#8a2be2",  // Blue Violet color
    },
    background: {
      default: "#e0f7fa",  // Background color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
        },
      },
    },
  },
});

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCitySelect = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);

      const forecastData = await fetchForecast(city);
      setForecast(forecastData.forecast);
    } catch (error) {
      console.error(error.message);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <CloudIcon sx={{ mr: 2 }} />
          <Typography
            color={"white"}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Weather Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography  color = "#913639" variant="h4" gutterBottom>
            Check Your Local Weather
          </Typography>
          <SearchBar onCitySelect={handleCitySelect} />
        </Box>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {weather && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: "15px",
              background: "linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)", // Light blue gradient
              color: "white", // Light text color for contrast
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              fontWeight="bold"
              color={'#31255a'}
            >
              Current Weather
            </Typography>
            <WeatherCard weather={weather} />
          </Paper>
        )}

        {forecast && (
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: "15px", background: "rgba(106, 100, 251, 0.1)" }}>
            <Typography color={'#31255a'} variant="h5" gutterBottom align="center">
              Weather Forecast
            </Typography>
            <Forecast forecast={forecast} />
          </Paper>
        )}
        {forecast && (
          <Paper elevation={3} sx={{ p: 3, borderRadius: "15px" }}>
            <Typography variant="h5" gutterBottom align="center">
              Temperature Trend
            </Typography>
            <TemperatureChart forecast={forecast} />
          </Paper>
        )}
      </Container>
      <Box
        component="footer"
        sx={{ bgcolor: "background.paper", py: 2, mt: "auto" }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Weather Dashboard. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;