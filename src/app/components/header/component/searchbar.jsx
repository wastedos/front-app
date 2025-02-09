import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar({ onSearch }){

    const handleInputChange = (event) => {
        const value = event.target.value;
        onSearch(value); // تحديث النص في الحالة المشتركة
    };

    return(
        <Paper
            component="form"
            sx={{p: '2px 4px', display:{xs:'none', md:'flex'}, alignItems: 'center', width: 450, height:45 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='بحث'

            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <SearchIcon />
            </IconButton>
        </Paper>

    );
}