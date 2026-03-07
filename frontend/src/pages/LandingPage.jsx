import { Box } from '@mui/material';

// Layout Components
import Navbar from '../components/sections/Navbar';
import Footer from '../components/layout/Footer';

// Section Components
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: '#FFFFFF',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
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
  );
};

export default LandingPage;
