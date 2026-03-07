import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Services = () => {
  const services = [
    {
      icon: <SchoolIcon sx={{ fontSize: 50 }} />,
      title: 'Training Management',
      description: 'Create and manage comprehensive leadership training programs, sessions, and enrollments with ease.',
      color: '#E91E8C',
      gradient: 'linear-gradient(135deg, #E91E8C 0%, #C41570 100%)',
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 50 }} />,
      title: 'Ground Follow-Up',
      description: 'Real-time monitoring and tracking of training activities, participant progress, and attendance.',
      color: '#4A7FC1',
      gradient: 'linear-gradient(135deg, #4A7FC1 0%, #3A5F9A 100%)',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
      title: 'Youth Empowerment',
      description: 'Specialized programs designed to nurture competent professionals and emerging young leaders.',
      color: '#00B894',
      gradient: 'linear-gradient(135deg, #00B894 0%, #00A080 100%)',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
      title: 'Executive Development',
      description: 'Personal and executive development programs focused on building visionary leadership skills.',
      color: '#FDCB6E',
      gradient: 'linear-gradient(135deg, #FDCB6E 0%, #F0A830 100%)',
    },
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 50 }} />,
      title: 'Content Delivery',
      description: 'Access training materials through our blog platform with embedded YouTube videos and resources.',
      color: '#6C5CE7',
      gradient: 'linear-gradient(135deg, #6C5CE7 0%, #5641C7 100%)',
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 50 }} />,
      title: 'Project Coordination',
      description: 'Kanban-style boards for managing collaborative projects, events, and mentorship programs.',
      color: '#E91E8C',
      gradient: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
    },
  ];

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        background: '#F8F9FA',
        width: '100%',
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-block',
              px: 2.5,
              py: 1,
              background: 'linear-gradient(135deg, #E91E8C15 0%, #4A7FC115 100%)',
              borderRadius: '50px',
              mb: 2,
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
              What We Offer
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.25rem', md: '3rem' },
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Our{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Services
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              color: '#4a5568',
              maxWidth: 750,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Comprehensive training management solutions designed to empower leaders
            and transform organizations across Cameroon and beyond.
          </Typography>
        </Box>

        {/* Services Grid - 2 Columns, 3 Rows */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)'
            },
            gap: { xs: 3, md: 4 },
            width: '100%',
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                border: '2px solid transparent',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: '300px', md: '350px' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: service.gradient,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                },
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: `0 20px 40px ${service.color}30`,
                  borderColor: `${service.color}40`,
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .service-icon': {
                    background: service.gradient,
                    color: 'white',
                    transform: 'scale(1.1) rotate(5deg)',
                  },
                  '& .service-arrow': {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Icon */}
                  <Box
                    className="service-icon"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 90,
                      height: 90,
                      borderRadius: '20px',
                      background: `${service.color}15`,
                      color: service.color,
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {service.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#1a1a1a',
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#4a5568',
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      mb: 3,
                      flex: 1,
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Learn More Link */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: service.color,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>Learn More</Typography>
                    <ArrowForwardIcon
                      className="service-arrow"
                      sx={{
                        fontSize: 18,
                        opacity: 0,
                        transform: 'translateX(-10px)',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
