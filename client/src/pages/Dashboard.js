import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button onClick={() => logout()} variant="outlined">
          Logout
        </Button>
      </Box>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">User Profile</Typography>
              <Typography>{user?.name}</Typography>
              <Typography>{user?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Traffic Reports</Typography>
              {/* Traffic reports will go here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;