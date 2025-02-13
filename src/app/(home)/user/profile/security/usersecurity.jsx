import * as React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  useTheme,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormDelete from "./formdelete";

const UserSecurity = () => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    password: "",
    pwd: "",
    gender: "",
    birth: "",
  });

  const [message, setMessage] = React.useState(null); // لحفظ رسالة الخطأ أو النجاح

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // تحديث الحقل المعين فقط
      password: value, // تحديث password بنفس القيمة
      pwd: value, // تحديث pwd بنفس القيمة
    }));
  };;

  const handleDateChange = (newDate) => {
    if (newDate) {
      setFormData((prevData) => ({
        ...prevData,
        birth: dayjs(newDate).format("YYYY-MM-DD"),
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    console.log("🚀 البيانات المرسلة:", formData); // تحقق مما يتم إرساله
  
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "لم يتم العثور على توكن المصادقة!" });
      return;
    }
  
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setFormData({
        name: "",
        phone: "",
        password: "",
        gender: "",
        birth: ""
      });
      setMessage({ type: "success", text: "تم تحديث البيانات بنجاح!" });
      console.log("✅ تم التحديث:", response.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "حدث خطأ أثناء التحديث!",
      });
      console.error("❌ خطأ في التحديث:", error);
    }
  };
  

  return (
    <Box align="center">
      <Box
        sx={{
          backgroundColor: theme.palette.colors.box,
          p: 3,
          width: { xs: "100%", md: "50%" },
          borderRadius: "15px",
        }}
      >
        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                name="name"
                label="اسم المستخدم"
                type="text"
                margin="dense"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="phone"
                label="رقم الهاتف"
                type="number"
                margin="dense"
                fullWidth
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="password"
                label="كلمة المرور"
                type="password"
                margin="dense"
                fullWidth
                variant="outlined"
                value={formData.password || formData.pwd}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:12, md:7, lg:9}}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="gender">الجنس</InputLabel>
                <Select
                  labelId="الجنس"
                  id="gender"
                  label="الجنس"
                  value={formData.gender}
                  onChange={handleChange}
                  name="gender"
                >
                  <MenuItem value="male">ذكر</MenuItem>
                  <MenuItem value="female">أنثى</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:6, md:5, lg:3}} sx={{my:1, width:'100%'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.birth ? dayjs(formData.birth) : null}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none", width: "100%" }}
              >
                تعديل
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box my={5}>
        <FormDelete/>
      </Box>
    </Box>
  );
};

export default UserSecurity;
