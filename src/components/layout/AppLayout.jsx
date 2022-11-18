import { Box, Container, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';
import { setUser } from '../../redux/features/userSlice';
import Navbar from '../common/Navbar';

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        // save user
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar
        theme={theme}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <Container
        sx={{
          p: 5,
          marginY: 5,
          width: 'max-content',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default AppLayout;
