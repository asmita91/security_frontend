import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaPaw } from 'react-icons/fa';
import { ResponsiveAppBarHomepage } from '../AppBar/ResponsiveAppBarHomepage';
import { ResponsiveAppBarLandingPage } from '../AppBar/ResponsiveAppBarLandingPage';

export const About = () => {
  return (
    <div style={{ backgroundColor: '#b2d5f5', color: 'black', minHeight: '100vh', padding: '20px' }}>
            <ResponsiveAppBarLandingPage />
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h3" component="h4" gutterBottom align="center">
        About Us <FaPaw style={{ color: '#ff6f61' }} />
      </Typography>
      
      <Typography variant="body1" paragraph align="center">
        Welcome to our pet shop! We are dedicated to providing the best care and products for your furry friends. 
        Learn more about us below.
      </Typography>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><FaPaw style={{ marginRight: '10px', color: '#ff6f61' }} />Our Story</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our pet shop was founded out of a love for animals. We started as a small family-owned business 
            and have grown into a community favorite.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><FaPaw style={{ marginRight: '10px', color: '#ff6f61' }} />Our Mission</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our mission is to provide high-quality products and services that enhance the well-being and 
            happiness of pets and their owners. We are committed to being a trusted partner in your pet's life.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><FaPaw style={{ marginRight: '10px', color: '#ff6f61' }} />Meet the Team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our team is made up of passionate pet lovers who are dedicated to providing excellent service. 
            Each team member brings their unique expertise and love for animals to our shop.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    </div>
  );
};
