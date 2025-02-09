'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import TableDeposit from './tabledeposit';
import TableWithdraw from './tablewithdraw';
import TableTransfer from './tabletransfer';



export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList  variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ textTransform:'none' }} label="ايداع" value="1" />
            <Tab sx={{ textTransform:'none' }} label="سحب" value="2" />
            <Tab sx={{ textTransform:'none' }} label="تحويل" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><TableDeposit/></TabPanel>
        <TabPanel value="2"><TableWithdraw/></TabPanel>        
        <TabPanel value="3"><TableTransfer/></TabPanel>

      </TabContext>
    </Box>
  );
}
