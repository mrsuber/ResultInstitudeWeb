import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState(null);

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
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: 'Email Us',
      value: 'info@resultinstitute.cm',
      subtitle: 'Send us an email anytime',
      href: 'mailto:info@resultinstitute.cm',
      color: '#4A7FC1',
      bgColor: '#4A7FC115',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: 'Call Us',
      value: '+237 XXX XXX XXX',
      subtitle: 'Mon-Fri 8am to 5pm',
      href: 'tel:+237000000000',
      color: '#E91E8C',
      bgColor: '#E91E8C15',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      title: 'Visit Us',
      value: 'Douala, Cameroon',
      subtitle: 'Main Training Center',
      href: null,
      color: '#00B894',
      bgColor: '#00B89415',
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: '#F8F9FA',
        width: '100%',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
              Get In Touch
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
            Let's{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Connect
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
            Ready to transform your leadership journey? Reach out to our team
            and discover how we can help you achieve your goals.
          </Typography>
        </Box>

        {/* Contact Info Cards - Full Width */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            },
            gap: 3,
            mb: 6,
          }}
        >
          {contactInfo.map((info, index) => (
            <Box
              key={index}
              component={info.href ? 'a' : 'div'}
              href={info.href || undefined}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                background: '#FFFFFF',
                border: '2px solid #E5E7EB',
                borderRadius: '16px',
                p: 4,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                cursor: info.href ? 'pointer' : 'default',
                '&:hover': info.href ? {
                  borderColor: info.color,
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 32px ${info.color}20`,
                } : {},
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '16px',
                  background: info.bgColor,
                  color: info.color,
                  mb: 2,
                  transition: 'all 0.3s ease',
                }}
              >
                {info.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#1a1a1a',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  mb: 1,
                }}
              >
                {info.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#2d3748',
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 0.5,
                }}
              >
                {info.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#718096',
                  fontSize: '0.875rem',
                }}
              >
                {info.subtitle}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Contact Form - Centered */}
        <Box
          sx={{
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              background: '#FFFFFF',
              border: '2px solid #E5E7EB',
              borderRadius: '20px',
              p: { xs: 4, md: 6 },
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 700,
                color: '#1a1a1a',
                mb: 1,
                textAlign: 'center',
              }}
            >
              Send Us a Message
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#718096',
                mb: 4,
                textAlign: 'center',
                fontSize: '1rem',
              }}
            >
              Fill out the form below and we'll get back to you within 24 hours
            </Typography>

            <Stack spacing={3}>
              {/* Name and Email Row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#4A7FC1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E91E8C',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#718096',
                      fontWeight: 500,
                      '&.Mui-focused': {
                        color: '#E91E8C',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#4A7FC1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E91E8C',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#718096',
                      fontWeight: 500,
                      '&.Mui-focused': {
                        color: '#E91E8C',
                      },
                    },
                  }}
                />
              </Box>

              {/* Phone and Subject Row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#4A7FC1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E91E8C',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#718096',
                      fontWeight: 500,
                      '&.Mui-focused': {
                        color: '#E91E8C',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#4A7FC1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E91E8C',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#718096',
                      fontWeight: 500,
                      '&.Mui-focused': {
                        color: '#E91E8C',
                      },
                    },
                  }}
                />
              </Box>

              {/* Message Field */}
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                multiline
                rows={6}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: '#4A7FC1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#E91E8C',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#718096',
                    fontWeight: 500,
                    '&.Mui-focused': {
                      color: '#E91E8C',
                    },
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #E91E8C 0%, #4A7FC1 100%)',
                  color: 'white',
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(233, 30, 140, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(233, 30, 140, 0.4)',
                  },
                }}
              >
                Send Message
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
