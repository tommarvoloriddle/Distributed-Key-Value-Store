import logo from './logo.svg';
import './App.css';
import SlaveContainer from './containers/slave/slaveContainer.jsx';
import { Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust primary color as needed
    },
    secondary: {
      main: '#dc004e', // Adjust secondary color as needed
    },
  },
});

function App() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <ThemeProvider theme={theme}>
          <Container maxWidth="lg" >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Distributed key Value Store
            </Typography>
            <SlaveContainer />
          </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
