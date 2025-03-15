'use client'
import * as React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";

export default function HomeImage() {
    const [open, setOpen] = React.useState(false);
    const [Images, setImages] = React.useState([]); // ✅ لحفظ الصور الجديدة
    const [uploadedImages, setUploadedImages] = React.useState([]); // ✅ لحفظ الصور المرفوعة مسبقًا
    const theme = useTheme();

    // 🟢 **جلب الصور عند تحميل الصفحة**
    React.useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images/get-images`);
                const filteredImages = response.data.filter(img => img.imageType === "swiper"); // ✅ تصفية الصور
                setUploadedImages(filteredImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, []);

    // 🟢 **إضافة صورة جديدة**
    const handleAddImages = () => {
        setImages([...Images, { imageType: "swiper", imageTitle: "", image: null }]);
    };
    

    // 🟢 **رفع صورة جديدة**
    const handleUploadImages = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const updateImages = [...Images];
            updateImages[index].image = file;
            setImages(updateImages);
        }
    };

    // 🟢 **إرسال الصور الجديدة إلى السيرفر**
    const handleSubmit = async (event) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة
        
        const formDataToSend = new FormData();
        
        // إضافة بيانات الصور
        Images.forEach((img) => {
            formDataToSend.append("imageType", img.imageType);
            formDataToSend.append("imageTitle", img.imageTitle);
            formDataToSend.append("images", img.image); // إضافة الصورة
        });
    
        console.log("🔍 بيانات الفورم قبل الإرسال:", [...formDataToSend]);
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/add-image`, {
                method: "POST",
                body: formDataToSend,
            });
    
            const data = await response.json();
            console.log("✅ استجابة السيرفر:", data);
    
            if (response.ok) {
                setUploadedImages([...uploadedImages, ...Images]);
                setImages([]); // تفريغ الصور الجديدة بعد رفعها
            } else {
                console.error("❌ خطأ أثناء الرفع:", data);
            }
        } catch (error) {
            console.error("❌ خطأ في الاتصال بالسيرفر:", error);
        }
    };
    
    

    // 🟢 **حذف صورة مرفوعة مسبقًا**
    const handleDeleteImage = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/images/delete-image/${id}`);
            setUploadedImages(uploadedImages.filter((img) => img._id !== id)); // ✅ تحديث القائمة بعد الحذف
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // 🟢 **تحديث صورة مرفوعة مسبقًا**
    const handleUpdateImage = async (index, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/images/update-image/${uploadedImages[index]._id}`,
                formData
            );

            // ✅ تحديث الصورة في القائمة بعد التعديل
            const updatedImages = [...uploadedImages];
            updatedImages[index].image = response.data.image;
            setUploadedImages(updatedImages);
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <React.Fragment>
            <Button onClick={() => setOpen(true)} variant='outlined' sx={{  }}>
            الصور المتحركة 
            </Button>
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: { 
                    width: "30rem",
                    maxWidth: "none",
                    }
                }}
            >
                <DialogTitle align="center">تحديد الصور</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Button onClick={handleAddImages} variant="outlined" sx={{ width: '100%', mb: 3 }}>
                            إضافة صورة
                        </Button>
                        <Grid container spacing={2}>
                            {/* ✅ عرض الصور المرفوعة مسبقًا مع إمكانية التعديل والحذف */}
                            {uploadedImages.map((img, index) => (
                                <Grid key={`uploaded-${index}`} item xs={12} sx={{backgroundColor: theme.palette.colors.box, p:2, borderRadius:'15px', width:'100%'}}>
                                    <Box
                                        component="img"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${img.image}`}
                                        sx={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '10rem',
                                            borderRadius: '10px',
                                            border: '1px solid #ccc',
                                        }}
                                        alt={`Uploaded Image ${index}`}
                                    />
                                    <Grid container spacing={2}>
                                    <Grid size={6}>
                                    <Button
                                        fullWidth
                                        component="label"
                                        variant="outlined"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ textTransform: 'none', mt: 1 }}
                                    >
                                        تحديث الصورة
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={(event) => handleUpdateImage(index, event)}
                                        />
                                    </Button>
                                    </Grid>
                                    <Grid size={6}>
                                    <Button
                                        fullWidth
                                        onClick={() => handleDeleteImage(img._id)}
                                        color="error"
                                        variant='outlined'
                                        sx={{ mt: 1 }}
                                    >
                                        حذف الصورة
                                    </Button>
                                    </Grid>
                                    </Grid>
                                </Grid>
                            ))}

                            {/* ✅ عرض الصور الجديدة قبل الرفع */}
                            {Images.map((img, index) => (
                                <Grid key={index} item xs={12} sx={{width:'100%'}}>
                                    <Button
                                        fullWidth
                                        component="label"
                                        variant="outlined"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ textTransform: 'none', height: '10rem', width: '100%' }}
                                    >
                                        {img.image ? img.image.name : "تحميل صورة"}
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={(event) => handleUploadImages(index, event)}
                                        />
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                        <Button type="submit" variant="outlined" color='success' sx={{ width: '100%', mt: 3 }}>
                            تأكيد
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
