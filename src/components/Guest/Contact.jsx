import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

import { ResponsiveAppBarLandingPage } from '../AppBar/ResponsiveAppBarLandingPage';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sanitize inputs
    const sanitizedData = {
      name: DOMPurify.sanitize(name),
      email: DOMPurify.sanitize(email),
      message: DOMPurify.sanitize(message),
    };

    // Basic validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      alert('All fields are required.');
      return;
    }

    // Send sanitizedData to the server or handle as needed
    console.log('Form submitted:', sanitizedData);

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={{ backgroundColor: '#b2d5f5', color: 'black', minHeight: '100vh', padding: '20px'}}>
      <ResponsiveAppBarLandingPage />
      <Box 
        sx={{ 
          maxWidth: '550px', 
          margin: 'auto', 
           marginTop:"15px" ,
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            sx={{ marginBottom: '16px' }}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: '16px' }}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={handleMessageChange}
            sx={{ marginBottom: '16px' }}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};
