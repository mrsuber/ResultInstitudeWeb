import { Box, Container, Typography, Grid, Avatar, Stack, Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';

const About = () => {
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

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: '#4A7FC1',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mt: 1,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Building Leaders for{' '}
                <Box
                  component="span"
                  sx={{
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
                  color: '#2d3748',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.125rem' },
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
                  color: '#4a5568',
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
                      background: '#F8F9FA',
                      border: '2px solid #E5E7EB',
                      color: '#2d3748',
                      fontWeight: 600,
                      px: 2,
                      py: 2.5,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: '#E91E8C',
                        color: 'white',
                        borderColor: '#E91E8C',
                        transform: 'translateY(-2px)',
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
                    sx={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      p: 3,
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
                        borderColor: feature.color,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: `${feature.color}15`,
                        color: feature.color,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#1a1a1a',
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1.1rem',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#718096',
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
              sx={{
                mt: 4,
                p: 3,
                background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(233, 30, 140, 0.2)',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.5rem',
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
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '0.9rem',
                    }}
                  >
                    CEO & Founder, Result Institute
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
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
