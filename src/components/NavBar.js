import { AppBar, Toolbar, Typography } from '@mui/material';

export default function NavBar() {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div">
          News App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
