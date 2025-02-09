'use client'
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';

export default function Safe() {
    const theme = useTheme();
    const [data, setData] = useState({ cash: 0, instapay: 0, vodafone: 0, fawry: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // قائمة المحافظ لعرضها بشكل ديناميكي
    const wallets = [
        { name: 'Cash', key: 'cash' },
        { name: 'Instapay', key: 'instapay' },
        { name: 'Vodafone Cash', key: 'vodafone' },
        { name: 'Fawry', key: 'fawry' },
    ];

    // استدعاء API لجلب البيانات باستخدام Axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/transactions/safe'); // استدعاء API الخاص بعرض المحافظ
                
                // تحويل البيانات إلى الشكل المطلوب
                const formattedData = response.data.reduce((acc, safe) => {
                    acc[safe.typeSafe] = safe.amountSafe || 0;
                    return acc;
                }, {});

                setData(formattedData);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
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
                <Grid
                    key={wallet.key}
                    sx={{
                        height: '8rem',
                        width: { xs: '100%', sm: '48%', xl: '23%' },
                        borderRadius: '15px',
                        my: 2,
                        backgroundColor: theme.palette.colors.box,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: '600' }}>
                                {wallet.name}
                            </Typography>
                            <Typography variant='h6' sx={{ mt: 1, fontWeight: '600' }}>
                                ${data[wallet.key] || 0} {/* عرض قيمة المحفظة */}
                            </Typography>
                        </Box>
                        <Box sx={{
                            height: '3rem',
                            width: '3rem',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#bbbb',
                        }}>
                            <AttachMoneyIcon />
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
