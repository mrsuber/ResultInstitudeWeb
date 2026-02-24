import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import './styles/professional.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#FFFFFF',
        }}
      >
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <Box component="main">
          {/* Hero Section */}
          <Hero />

          {/* Services Section */}
          <Services />

          {/* About Section */}
          <About />

          {/* Contact Section */}
          <Contact />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
