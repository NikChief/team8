import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    imgPath: './img/backgroundPng/cs1.png',
  },
  {
    imgPath: './img/backgroundPng/dota1.png',
  },
  {
    imgPath: './img/backgroundPng/pubg.png',
  },
];

function MainPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { user } = useSelector((state) => state.userReducer);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Box
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {!user.id ? (
          <>
            <Typography
              variant="h2"
              sx={{ borderBottom: '2px solid white', paddingBottom: '2rem', fontWeight: 'bold' }}
            >
              Добро пожаловать на Team8
            </Typography>
            <Box sx={{ paddingTop: '1rem', display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">
                Тут вы можете найти себе тиммейта или команду для ваших любимых игр.
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ marginLeft: '1rem' }}
                onClick={() => navigate('/login')}
              >
                Давайте же начнем
              </Button>
            </Box>
          </>
        ) : (
          <h1>Тут будет что-то другое</h1>
        )}
      </Box>
    </>
  );
}

export default MainPage;
