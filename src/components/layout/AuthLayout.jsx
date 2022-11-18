import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
const AuthLayout = ({ title }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {' '}
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            gap: '0 5px',
            paddingX: 5,
            marginBottom: 2,
          }}
          variant='h4'
          component={'h4'}
        >
          <Avatar src='/logo-work.png' />
          <span> Workzone</span>
        </Typography>
        <Card>
          <CardContent>
            {/* <img src={assets.images.logoDark} style={{ width: '100px' }} alt='app logo' /> */}

            <Outlet />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AuthLayout;
