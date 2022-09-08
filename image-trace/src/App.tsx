import React from "react";
import Canvas from "./Canvas";
import "./App.css";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import TopBar from "./Topbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8C00",
    },
    secondary: {
      main: "#B0E0E6",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
        >
          <TopBar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // bgcolor: "rgb(231, 235, 240)",
            p: 3,
            height: "100%",
          }}
        >
          <Canvas />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
