import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BackgroundImageContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?cs=srgb&dl=snow-landscape-mountains-443446.jpg&fm=jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
  animation: `${fadeIn} 1.5s ease-in-out`,
});

const StyledContainer = styled(Container)({
  position: 'relative',
  zIndex: 1,
  background: 'rgba(255, 255, 255, 0.2)', // Adjusted transparency
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 2s ease-in-out`,
});

const TransparentPaper = styled(Paper)({
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjusted transparency
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 2s ease-in-out`,
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3700b3',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'black', // Updated label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'black', // Updated focused label color
  },
  '& .MuiOutlinedInput-input': {
    color: 'black', // Updated input text color
  },
});

const StyledButton = styled(Button)({
  backgroundColor: 'rgba(7, 7, 7, 0.7)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'red',
  },
  fontWeight: 'bold',
  borderRadius: '50px',
  padding: '10px 20px',
});

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second-page');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <BackgroundImageContainer>
      <StyledContainer maxWidth="sm">
        <TransparentPaper elevation={3}>
          <Typography variant="h4" gutterBottom style={{ color: 'black' }}> {/* Updated title color */}
            User Information
          </Typography>
          <StyledTextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box textAlign="center" marginTop="20px">
            <StyledButton variant="contained" onClick={handleSubmit}>
              Submit
            </StyledButton>
          </Box>
        </TransparentPaper>
      </StyledContainer>
    </BackgroundImageContainer>
  );
};

export default UserForm;
