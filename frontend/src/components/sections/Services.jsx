import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useEffect, useRef } from 'react';

const Services = () => {
  const servicesRef = useRef(null);

  const services = [
    {
      icon: <SchoolIcon sx={{ fontSize: 50 }} />,
      title: 'Training Management',
      description: 'Create and manage comprehensive leadership training programs, sessions, and enrollments with ease.',
      gradient: 'linear-gradient(135deg, #E91E8C 0%, #FF6BB5 100%)',
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 50 }} />,
      title: 'Ground Follow-Up',
      description: 'Real-time monitoring and tracking of training activities, participant progress, and attendance.',
      gradient: 'linear-gradient(135deg, #4A7FC1 0%, #6FA3E0 100%)',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
      title: 'Youth Empowerment',
      description: 'Specialized programs designed to nurture competent professionals and emerging young leaders.',
      gradient: 'linear-gradient(135deg, #00B894 0%, #00D2A0 100%)',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
      title: 'Executive Development',
      description: 'Personal and executive development programs focused on building visionary leadership skills.',
      gradient: 'linear-gradient(135deg, #FDCB6E 0%, #FFA502 100%)',
    },
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 50 }} />,
      title: 'Content Delivery',
      description: 'Access training materials through our blog platform with embedded YouTube videos and resources.',
      gradient: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 50 }} />,
      title: 'Project Coordination',
      description: 'Kanban-style boards for managing collaborative projects, events, and mentorship programs.',
      gradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
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

    if (servicesRef.current) {
      const elements = servicesRef.current.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="services"
      ref={servicesRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: 'rgba(45, 52, 54, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }} className="reveal">
          <Typography
            variant="overline"
            sx={{
              color: '#E91E8C',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: 2,
            }}
          >
            What We Offer
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              color: 'white',
              mt: 1,
              mb: 2,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Comprehensive training management solutions designed to empower leaders
            and transform organizations across Cameroon and beyond.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                className="reveal"
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(31, 38, 135, 0.3)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: service.gradient,
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      mb: 3,
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        background: service.gradient,
                      },
                    }}
                  >
                    {service.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: 'white',
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
