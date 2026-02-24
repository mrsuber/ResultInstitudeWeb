import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Hero = () => {
  return (
    <Box
      id="home"
      sx={{
        background: '#FFFFFF',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Badge */}
              <Box
                sx={{
                  display: 'inline-block',
                  px: 2.5,
                  py: 1,
                  background: 'linear-gradient(135deg, #E91E8C15 0%, #4A7FC115 100%)',
                  borderRadius: '50px',
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: '#E91E8C',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Training Management System
                </Typography>
              </Box>

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#1a1a1a',
                  mb: 3,
                }}
              >
                Empowering{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Change Makers
                </Box>{' '}
                and Global Emerging Leaders
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.7,
                  color: '#4a5568',
                  mb: 4,
                }}
              >
                Founded by Abba Abdouraman, Result Institute is Cameroon's premier leadership
                development organization. We specialize in transforming individuals into visionary
                leaders through comprehensive training programs.
              </Typography>

              {/* Key Points */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                {[
                  'Personal & Executive Development',
                  'Leadership Training Excellence',
                  'Youth Empowerment Programs',
                ].map((point, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#E91E8C', fontSize: 24 }} />
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        color: '#2d3748',
                        fontWeight: 500,
                      }}
                    >
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* CTA Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<RocketLaunchIcon />}
                  sx={{
                    background: '#E91E8C',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 8px 16px rgba(233, 30, 140, 0.3)',
                    '&:hover': {
                      background: '#C41570',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 24px rgba(233, 30, 140, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started Today
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    color: '#4A7FC1',
                    borderColor: '#4A7FC1',
                    borderWidth: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#4A7FC1',
                      borderWidth: 2,
                      background: 'rgba(74, 127, 193, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Right Side - Stats & Visual */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                borderRadius: '24px',
                p: { xs: 4, md: 6 },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative Circle */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              />

              {/* Stats Grid */}
              <Grid container spacing={3}>
                {[
                  { number: '500+', label: 'Trainees Empowered' },
                  { number: '50+', label: 'Training Programs' },
                  { number: '10+', label: 'Years Experience' },
                  { number: '98%', label: 'Success Rate' },
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        p: 3,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.25)',
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: '2rem', md: '2.5rem' },
                          color: 'white',
                          mb: 1,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.95)',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Tagline */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    fontStyle: 'italic',
                  }}
                >
                  "Building Leaders for Tomorrow"
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    mt: 1,
                  }}
                >
                  — Abba Abdouraman, Founder
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
