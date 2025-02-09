import * as React from 'react';
import { Box } from "@mui/material";
import Users from "./users";


//MetaData for Home page
export const metadata = {
    title: "Go Gac | User Profile",
    description: "Generated by German Auto Center",
};
export default function Profile(){
    return(
        <Box sx={{minHeight: '100vh', }}>
            
            <Users/>
            
        </Box>
    )
}