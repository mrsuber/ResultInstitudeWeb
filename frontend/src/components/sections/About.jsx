import { Box, Container, Typography, Grid, Avatar, Stack, Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { useEffect, useRef } from 'react';

const About = () => {
  const aboutRef = useRef(null);

  const features = [
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: 'Certified Programs',
      description: 'Internationally recognized training certifications',
      color: '#E91E8C',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Award Winning',
      description: 'Excellence in leadership development',
      color: '#4A7FC1',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Expert Trainers',
      description: 'Led by experienced professionals',
      color: '#00B894',
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      title: 'Global Impact',
      description: 'Empowering leaders across Africa',
      color: '#FDCB6E',
    },
  ];

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

    if (aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="about"
      ref={aboutRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6}>
            <Box className="reveal">
              <Typography
                variant="overline"
                sx={{
                  color: '#4A7FC1',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: 2,
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 800,
                  color: 'white',
                  mt: 1,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Building Leaders for
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Tomorrow
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  mb: 3,
                }}
              >
                Founded by <strong>Abba Abdouraman</strong>, Result Institute is Cameroon's
                premier leadership development organization. We specialize in transforming
                individuals into visionary leaders through comprehensive training programs.
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.8,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  mb: 4,
                }}
              >
                Our programs focus on personal and executive development, leadership training,
                youth empowerment, and entrepreneurship coaching. With partnerships including
                Verklin Foundation and JCI Cameroon, we're committed to nurturing competent
                professionals and emerging leaders across Africa.
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {['Leadership', 'Innovation', 'Excellence', 'Empowerment'].map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      fontWeight: 600,
                      px: 2,
                      py: 2.5,
                      fontSize: '0.9rem',
                      '&:hover': {
                        background: 'rgba(233, 30, 140, 0.3)',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right Side - Features Grid */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    className="reveal"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 4,
                      p: 3,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(31, 38, 135, 0.3)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: `${feature.color}20`,
                        color: feature.color,
                        mx: 'auto',
                        mb: 2,
                        border: `2px solid ${feature.color}40`,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 1,
                        fontSize: '1.1rem',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Founder Info */}
            <Box
              className="reveal"
              sx={{
                mt: 4,
                p: 3,
                background: 'linear-gradient(135deg, rgba(233, 30, 140, 0.1) 0%, rgba(74, 127, 193, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    bgcolor: '#E91E8C',
                  }}
                >
                  AA
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                    }}
                  >
                    Abba Abdouraman
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.9rem',
                    }}
                  >
                    CEO & Founder, Result Institute
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.8rem',
                    }}
                  >
                    Former Divisional Officer • Leadership Coach
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
