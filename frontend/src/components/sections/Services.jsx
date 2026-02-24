import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Services = () => {
  const services = [
    {
      icon: <SchoolIcon sx={{ fontSize: 48 }} />,
      title: 'Training Management',
      description: 'Create and manage comprehensive leadership training programs, sessions, and enrollments with ease.',
      color: '#E91E8C',
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 48 }} />,
      title: 'Ground Follow-Up',
      description: 'Real-time monitoring and tracking of training activities, participant progress, and attendance.',
      color: '#4A7FC1',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 48 }} />,
      title: 'Youth Empowerment',
      description: 'Specialized programs designed to nurture competent professionals and emerging young leaders.',
      color: '#00B894',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: 'Executive Development',
      description: 'Personal and executive development programs focused on building visionary leadership skills.',
      color: '#FDCB6E',
    },
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 48 }} />,
      title: 'Content Delivery',
      description: 'Access training materials through our blog platform with embedded YouTube videos and resources.',
      color: '#6C5CE7',
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 48 }} />,
      title: 'Project Coordination',
      description: 'Kanban-style boards for managing collaborative projects, events, and mentorship programs.',
      color: '#4A7FC1',
    },
  ];

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        background: '#F8F9FA',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#E91E8C',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            What We Offer
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1a1a1a',
              mt: 1,
              mb: 2,
              lineHeight: 1.3,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#4a5568',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
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
                sx={{
                  height: '100%',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #E5E7EB',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
                    borderColor: service.color,
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
                      width: 80,
                      height: 80,
                      borderRadius: '16px',
                      background: `${service.color}15`,
                      color: service.color,
                      mb: 3,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {service.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 2,
                      fontSize: { xs: '1.25rem', md: '1.4rem' },
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#718096',
                      lineHeight: 1.7,
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
