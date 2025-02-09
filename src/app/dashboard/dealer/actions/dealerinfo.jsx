'use client';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function DealerInfo() {
    const theme = useTheme();
    const [data, setData] = useState({
      totalPriceBuy: 0, totalPriceSell: 0, payed: 0, theRest: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const wallets = [
      { name: 'إجمالي الشراء', key: 'totalPriceBuy' },
      { name: 'إجمالي البيع', key: 'totalPriceSell' },
      { name: 'تم السداد', key: 'payed' },
      { name: 'الباقي', key: 'theRest' },
    ];

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get('http://localhost:5000/dealer/total-report');
          setData(data);
        } catch (err) {
          setError(err.response?.data?.error || 'فشل في جلب البيانات');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <Grid container spacing={1} sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        {loading && (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Loading...
          </Typography>
        )}
        {error && (
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'red', width: '100%' }}>
            Error: {error}
          </Typography>
        )}
        {!loading && !error && wallets.map((wallet) => (
          <Grid key={wallet.key} sx={{ height: '6rem', width: { xs: '100%', sm: '48%', xl: '23%' }, borderRadius: '15px', backgroundColor: theme.palette.colors.box, }}>
            <Box
              sx={{display: 'flex', justifyContent: 'space-between', p: 3}}
            >
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {wallet.name}
              </Typography>
              <Typography variant='h5' sx={{ mt: 1, fontWeight: 'bold' }}>
                ${data[wallet.key] || 0}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
}
