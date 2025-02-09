'use client';
import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import WarehouseIcon from '@mui/icons-material/Warehouse';

export default function BanelThree() {
  // إنشاء حالة للبيانات وحالة لتحميل البيانات
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // الثيم والترجمة
  const theme = useTheme();

  // جلب البيانات من API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/dashboard/warehousechart'); // رابط الـ API
        const result = await response.json();

        if (response.ok) {
          const { income, outgo, returnin, returnout } = result.data;

          // تحديث البيانات
          setChartData([
            { label: 'الوارد', value: income },
            { label: 'الصادر', value: outgo },
            { label: 'مرتجع الوارد', value: returnin },
            { label: 'مرتجع الصادر', value: returnout },
          ]);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
      <Box
        sx={{
          height: '30rem',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: theme.palette.colors.box,
        }}
      >
        {loading ? (
          <Box>
            <Skeleton variant="circular" sx={{height:'15rem', width:'15rem', mt:7}} />
            <Typography variant="h5" align='center' mt={5}>جاري تحميل البينات</Typography>
          </Box>
        ) : error ? (
          <Box sx={{mt:10}}>
            <WarehouseIcon sx={{height:'10rem', width:'10rem'}}/>
            <Typography variant='h6' color='error'>لا يوجد بيانات داخل المخزن</Typography>
          </Box>
        ) : (
          <Box>
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 80,
                  outerRadius: 120,
                  paddingAngle: 3,
                  cx: 195,
                  cy: 150,
                },
              ]}
              width={400}
              height={300}
              slotProps={{
                legend: { hidden: true },
              }}
            />
            <Box
              sx={{
                mt: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <WarehouseIcon fontSize="large" sx={{ mr: 2 }} />
              <Typography variant="h5" fontWeight="600">
                تفاصيل المخزن
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
}
