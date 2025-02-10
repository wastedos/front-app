"use client"
import * as React from 'react';
import { IconButton, } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';//themes
import { useTheme } from '@emotion/react';
import { ThemeModeContext } from '@/src/app/theme/theme';

export default function Themebtn(){

    const theme = useTheme();
    const { setMode } = React.useContext(ThemeModeContext);

    return(
        <IconButton
        onClick={() => {
          const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';
          localStorage.setItem("currentMode", newMode);
          setMode(newMode);
        }}
      >
        {theme.palette.mode === 'light' ? <DarkModeIcon/> : <WbSunnyIcon/>}
      </IconButton>
    );
}