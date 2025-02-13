'use client'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { BarPlot, ChartContainer } from '@mui/x-charts';


const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function BanelOne(){

    //Create Themes && Language
    const theme = useTheme();

    const [stats, setStats] = useState({ admin: 0, employee: 0, users: 0 });

    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/stats`)
        .then((response) => {
          setStats(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching stats:', error);
        });
    }, []);

    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected/user-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // إرسال التوكن
          },
        });
        setUserInfo(response.data); // تعيين البيانات المسترجعة
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    useEffect(() => {
        fetchUserInfo(); // استدعاء الوظيفة عند تحميل المكون
    }, []);

    const [walletData, setWalletData] = useState({
        cash: 0,
        vodafone: 0,
        instapay: 0,
        fawry: 0,
    });
    const [totalAmount, setTotalAmount] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/safe`);
            const data = response.data;
      
            const walletData = {
              cash: 0,
              vodafone: 0,
              instapay: 0,
              fawry: 0,
            };
      
            // تجميع المبالغ يدويًا
            data.forEach((item) => {
              if (walletData[item.typeSafe] !== undefined) {
                walletData[item.typeSafe] += item.amountSafe;
              }
            });
      
            setWalletData(walletData);
      
            // حساب المجموع الإجمالي
            const total = Object.values(walletData).reduce((acc, val) => acc + val, 0);
            setTotalAmount(total);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
    }, []);


    const [transactions, setTransactions] = useState({ deposits: [], withdraws: [] });

    const transaction = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/today-transactions`);
          console.log("Response Data:", response.data); // ✅ تأكد إن البيانات واصلة
          setTransactions(response.data); 
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
      
      useEffect(() => {
        transaction();
      }, []);
      
    const totalIncome = transactions?.deposits?.reduce((sum, deposit) => sum + deposit.amountDeposit, 0) || 0;
    const totalExpenses = transactions?.withdraws?.reduce((sum, withdraw) => sum + withdraw.amountWithdraw, 0) || 0;

    return (
        <Grid size={12} sx={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap',}}>
            <Grid sx={{height:'12rem', width:{xs:'100%', xl:'50%'}, borderRadius:'15px', my:2, backgroundColor: theme.palette.colors.box}}>
                <Box sx={{display:'flex', justifyContent:'space-between', p:3,}}>
                    <Box>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <Avatar sx={{mr:2}}></Avatar> 
                            <Typography variant='body1' sx={{fontWeight:'600'}}>مرحبا بي عودتك </Typography>
                        </Box>
                        <Box sx={{mt:{xs:2, sm:7}, display:'flex'}}>
                            <Box>
                                <Typography variant='body2'>
                                    الدخل اليوم
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight:'600'}} color="success">
                                    ${totalIncome.toLocaleString()} <TrendingUpIcon/>
                                </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem sx={{mx:2}}/>
                            <Box>
                                <Typography variant='body2'>
                                    المصاريف اليومية
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight:'600'}} color="error">
                                    ${totalExpenses.toLocaleString()} <TrendingDownIcon/>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{width:'15rem', display:{xs:'none', md:'flex'}}}>
                        <Box
                        component="img"
                        src="/image/dashboard/dashboard/welcome-bg.webp"
                        sx={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            borderRadius:'20px'
                        }}
                        alt="Welcom image"
                        /> 
                    </Box>
                </Box>
            </Grid >


            <Grid sx={{height:'12rem', width:{xs:'100%', md:'48%', xl:'23%'}, borderRadius:'15px', my:2, backgroundColor: theme.palette.colors.box}}>
                <Box sx={{p:3, }}>
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <Box sx={{display:'flex', alignItems:'center', }}>
                        <AdminPanelSettingsIcon fontSize="large"/>
                        <Typography variant='h6' sx={{mx:1, fontWeight:'600'}}>
                            المشرفين
                        </Typography>
                        </Box>
                        <Typography variant='h6' sx={{mx:1, fontWeight:'600'}}>
                            {stats.admin}
                        </Typography>   
                    </Box>
                    
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',mt:3}}>
                        <Box sx={{display:'flex', alignItems:'center', }}>
                        <BadgeIcon fontSize="large"/>
                        <Typography variant='h6' sx={{mx:1, fontWeight:'600'}}>
                            الموظفين
                        </Typography>
                        </Box>
                        <Typography variant='h6' sx={{mx:1, fontWeight:'600'}}>
                            {stats.employee}
                        </Typography>   
                    </Box>
                    
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',mt:3}}>
                        <Box sx={{display:'flex', alignItems:'center', }}>
                        <GroupsIcon fontSize="large"/>
                        <Typography variant='h6' sx={{mx:1, fontWeight:'600'}}>
                            المستخدمين
                        </Typography>
                        </Box>
                        <Typography variant='h6' sx={{mx:1, fontWeight:'600'}}>
                            {stats.users}
                        </Typography>
                    </Box>
                </Box>
            </Grid>


            <Grid sx={{height:'12rem', width:{xs:'100%', md:'48%', xl:'23%'}, borderRadius:'15px', my:2, backgroundColor: theme.palette.colors.box, overflow:'hidden'}}>
                <Box sx={{display:'flex', justifyContent:'space-between', p:3,}}>
                    <Box>
                        <Typography variant='h5' sx={{fontWeight:'600'}}>
                           الاجمالي في المحفظة
                        </Typography>
                        <Typography variant='h6' sx={{mt:1, fontWeight:'600'}}>
                            $ {totalAmount}
                        </Typography>
                    </Box>
                    <Box sx={{height:'3rem', width:'3rem', borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#bbbb', }}>
                        <AccountBalanceWalletIcon fontSize='large'/>
                    </Box>
                </Box>
                <Box sx={{ height:'5rem', width:'100%'}}>
                    <ChartContainer
                    width={350}
                    height={150}
                    series={[{ data: uData, label: 'uv', type: 'bar', color: '#1976d2' }]}
                    xAxis={[{ scaleType: 'band', data: xLabels }]}
                    sx={{ m:-5}}
                    >            
                    <BarPlot/>
                    </ChartContainer>
                </Box>
            </Grid>

        </Grid>
    );
}