import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    { label: 'Training Management', href: '#services' },
    { label: 'Leadership Development', href: '#services' },
    { label: 'Youth Empowerment', href: '#services' },
    { label: 'Executive Coaching', href: '#services' },
  ];

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'rgba(45, 52, 54, 0.2)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        pt: 8,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box
                component="img"
                src="/logo.png"
                alt="Result Institute"
                sx={{
                  height: 80,
                  width: 'auto',
                  mb: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Result Institute
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                Empowering change makers and global emerging leaders through
                comprehensive training programs and executive development.
              </Typography>
            </Box>

            {/* Social Media */}
            <Stack direction="row" spacing={1}>
              {[
                { icon: <FacebookIcon />, href: 'https://facebook.com' },
                { icon: <TwitterIcon />, href: 'https://twitter.com' },
                { icon: <LinkedInIcon />, href: 'https://linkedin.com' },
                { icon: <InstagramIcon />, href: 'https://instagram.com' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(233, 30, 140, 0.3)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 16px rgba(233, 30, 140, 0.2)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#E91E8C',
                      paddingLeft: '8px',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Our Services
            </Typography>
            <Stack spacing={1.5}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  onClick={() => handleLinkClick(service.href)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#4A7FC1',
                      paddingLeft: '8px',
                    },
                  }}
                >
                  {service.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ color: '#E91E8C', fontSize: 20, mt: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}
                >
                  Douala, Cameroon
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <EmailIcon sx={{ color: '#4A7FC1', fontSize: 20 }} />
                <Link
                  href="mailto:info@resultinstitute.cm"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': { color: '#4A7FC1' },
                  }}
                >
                  info@resultinstitute.cm
                </Link>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <PhoneIcon sx={{ color: '#00B894', fontSize: 20 }} />
                <Link
                  href="tel:+237000000000"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': { color: '#00B894' },
                  }}
                >
                  +237 XXX XXX XXX
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />

        {/* Bottom Bar - Camsol Technologies */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © {currentYear} Result Institute. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Created with
            </Typography>
            <FavoriteIcon sx={{ color: '#E91E8C', fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              by
            </Typography>
            <Link
              href="https://www.camsoltechnology.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Camsol Technologies Ltd.
            </Link>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: { xs: 'center', md: 'right' },
            }}
          >
            Powered by Innovation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
