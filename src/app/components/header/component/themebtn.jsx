"use client"
import * as React from 'react';
import { IconButton, Typography } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'
//themes
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
        {theme.palette.mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
      </IconButton>
    );
}