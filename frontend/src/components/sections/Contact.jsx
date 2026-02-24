import { Box, Container, Typography, Grid, TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: 'Email',
      value: 'info@resultinstitute.cm',
      href: 'mailto:info@resultinstitute.cm',
      color: '#4A7FC1',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: 'Phone',
      value: '+237 XXX XXX XXX',
      href: 'tel:+237000000000',
      color: '#E91E8C',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: 'Location',
      value: 'Douala, Cameroon',
      href: null,
      color: '#00B894',
    },
  ];

  return (
    <Box
      id="contact"
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
            Get In Touch
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
            Contact Us
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
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Info Cards */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  component={info.href ? 'a' : 'div'}
                  href={info.href || undefined}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    p: 3,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    cursor: info.href ? 'pointer' : 'default',
                    '&:hover': info.href ? {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
                      borderColor: info.color,
                    } : {},
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '12px',
                        background: `${info.color}15`,
                        color: info.color,
                        flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: '#718096',
                          fontSize: '0.875rem',
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#1a1a1a',
                          fontWeight: 600,
                          fontSize: '1rem',
                        }}
                      >
                        {info.value}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                p: { xs: 3, md: 4 },
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#E5E7EB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E91E8C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E91E8C',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#E91E8C',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#E5E7EB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E91E8C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E91E8C',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#E91E8C',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#E5E7EB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E91E8C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E91E8C',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#E91E8C',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#E5E7EB',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E91E8C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E91E8C',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#E91E8C',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    fullWidth
                    sx={{
                      background: '#E91E8C',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      boxShadow: '0 8px 16px rgba(233, 30, 140, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: '#C41570',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 24px rgba(233, 30, 140, 0.4)',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
