import { Box, Container, Typography, Button, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="home"
      ref={heroRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 30, 140, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74, 127, 193, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Logo with Float Animation */}
          <Box
            className="reveal"
            component="img"
            src="/logo.png"
            alt="Result Institute"
            sx={{
              width: { xs: 200, sm: 300, md: 400 },
              height: 'auto',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))',
              animation: 'float 6s ease-in-out infinite',
            }}
          />

          {/* Main Heading */}
          <Typography
            variant="h1"
            className="reveal"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              color: 'white',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Welcome to{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #E91E8C 0%, #FF6BB5 50%, #4A7FC1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Result Institute
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            className="reveal"
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: 700,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Training Management System
          </Typography>

          {/* Description in Glass Card */}
          <Box
            className="reveal"
            sx={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
              p: { xs: 3, md: 4 },
              maxWidth: 800,
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              <Box component="span" sx={{ fontWeight: 700, color: 'white' }}>
                Empowering Change Makers and Global Emerging Leaders
              </Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
              }}
            >
              Founded by Abba Abdouraman, we specialize in personal and executive development,
              leadership training, youth empowerment, and entrepreneurship coaching in Douala, Cameroon.
            </Typography>
          </Box>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            className="reveal"
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchIcon />}
              sx={{
                background: 'linear-gradient(135deg, #E91E8C 0%, #C41570 100%)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(233, 30, 140, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF6BB5 0%, #E91E8C 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 32px rgba(233, 30, 140, 0.4)',
                },
              }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<InfoIcon />}
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(74, 127, 193, 0.8)',
                  background: 'rgba(74, 127, 193, 0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(74, 127, 193, 0.3)',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>

          {/* Stats */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            className="reveal"
            sx={{
              mt: 6,
              width: '100%',
              maxWidth: 800,
            }}
          >
            {[
              { number: '500+', label: 'Trainees' },
              { number: '50+', label: 'Programs' },
              { number: '10+', label: 'Years' },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 32px rgba(31, 38, 135, 0.2)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 600,
                    mt: 1,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
