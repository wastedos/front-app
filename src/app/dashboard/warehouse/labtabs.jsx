'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import TableWarehouse from './warehouse/tablewarehouse';
import TableIncome from './income/tableincome';
import TableOutgo from './outgo/tableoutgo';
import TableReturnIncome from './returnincome/tablereturnincome';
import TableReturnOutgo from './returnoutgo/tablereturnoutgo';
import { Tabs } from '@mui/material';


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
            <Tab sx={{ textTransform:'none' }} label="المخزن" value="1" />
            <Tab sx={{ textTransform:'none' }} label="الوارد" value="2" />
            <Tab sx={{ textTransform:'none' }} label="الصادر" value="3" />
            <Tab sx={{ textTransform:'none' }} label="مرتجع الوارد" value="4" />
            <Tab sx={{ textTransform:'none' }} label="مرتجع الصادر" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1"><TableWarehouse/></TabPanel>
        <TabPanel value="2"><TableIncome/></TabPanel>
        <TabPanel value="3"><TableOutgo/></TabPanel>
        <TabPanel value="4"><TableReturnIncome/></TabPanel>
        <TabPanel value="5"><TableReturnOutgo/></TabPanel>
      </TabContext>
    </Box>
  );
}
