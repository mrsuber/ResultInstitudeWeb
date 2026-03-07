import { Box, Typography, Paper } from '@mui/material';
import { Article as ArticleIcon } from '@mui/icons-material';

const Blog = () => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <ArticleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Blog
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage blog posts and articles
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Blog management coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default Blog;
