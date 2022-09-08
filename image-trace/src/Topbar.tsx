import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Image classifier</Typography>
      </Toolbar>
    </AppBar>
  );
}
