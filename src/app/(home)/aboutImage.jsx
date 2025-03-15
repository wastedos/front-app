'use client'
import * as React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";

export default function AboutImage() {
    const [open, setOpen] = React.useState(false);
    const [images, setImages] = React.useState([]); // لتخزين الصورة المختارة
    const [imageTitle, setImageTitle] = React.useState(""); // لتخزين عنوان الصورة
    const [uploadedImages, setUploadedImages] = React.useState([]); // لتخزين الصور المرفوعة
    const theme = useTheme();

    // جلب الصور عند تحميل الصفحة
    React.useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images/get-images`);
                const aboutImages = response.data.filter(img => img.imageType === "about"); // جلب صور "About" فقط
                setUploadedImages(aboutImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, []);

    // رفع صورة جديدة
    const handleUploadImages = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            if (images.length < 1) {  // السماح برفع صورة واحدة فقط
                setImages([...files]); // تخزين الصورة الجديدة
            } else {
                alert("يمكنك رفع صورة واحدة فقط");
            }
        }
    };

    // إرسال الصورة إلى السيرفر
    const handleSubmit = async (event) => {
        event.preventDefault(); // منع الصفحة من التحديث
        const formDataToSend = new FormData();
        formDataToSend.append("imageType", "about"); // تعيين "about" بشكل ثابت هنا
        formDataToSend.append("imageTitle", imageTitle); // إرسال عنوان الصورة

        // إضافة الصورة إلى الـ FormData
        images.forEach(image => {
            formDataToSend.append("images", image); // إرسال الصورة
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/add-image`, {
                method: "POST",
                body: formDataToSend,
            });
            const data = await response.json();
            console.log(data);

            // تحديث الصور بعد الرفع
            setUploadedImages(data.images); // تخزين الصورة المرفوعة في الحالة
            setImages([]); // تفريغ الصورة الجديدة بعد رفعها
            setImageTitle(""); // تفريغ عنوان الصورة
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // حذف الصورة
    const handleDeleteImage = async (imageId) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/images/delete-image/${imageId}`);
            const data = await response.json();
            console.log(data);
            setUploadedImages(uploadedImages.filter(image => image._id !== imageId)); // تحديث الصور بعد الحذف
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // تحديث صورة مرفوعة مسبقًا
    const handleUpdateImage = async (index, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file); // إضافة الصورة الجديدة

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/images/update-image/${uploadedImages[index]._id}`,
                formData
            );

            // ✅ تحديث الصورة في القائمة بعد التعديل
            const updatedImages = [...uploadedImages];
            updatedImages[index].image = response.data.image;
            setUploadedImages(updatedImages); // تحديث الحالة
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
                الصور الثابتة
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle align="center">تحديد الصورة</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* عرض الصور المرفوعة مسبقًا مع إمكانية الحذف أو التحديث */}
                            {uploadedImages.length > 0 && uploadedImages.map((uploadedImage, index) => (
                                <Grid item xs={12} sx={{ backgroundColor: theme.palette.colors.box, p: 2, borderRadius: '15px', width: '100%' }} key={index}>
                                    <Box
                                        component="img"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${uploadedImage.image}`}
                                        sx={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '10rem',
                                            borderRadius: '10px',
                                            border: '1px solid #ccc',
                                        }}
                                        alt="Uploaded Image"
                                    />
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        sx={{ marginTop: 1 }} 
                                        onClick={() => handleDeleteImage(uploadedImage._id)}>
                                        حذف
                                    </Button>
                                    {/* زر التحديث للصورة */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ marginTop: 1, marginLeft: 1 }}
                                        component="label"
                                    >
                                        تحديث
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={(e) => handleUpdateImage(index, e)}
                                        />
                                    </Button>
                                </Grid>
                            ))}

                            {/* عرض الصورة الجديدة قبل الرفع */}
                            {images.length === 0 && uploadedImages.length === 0 && (
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        component="label"
                                        variant="outlined"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ textTransform: 'none', width:'15rem', height:'10rem' }}
                                    >
                                        رفع الصورة
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleUploadImages}
                                        />
                                    </Button>
                                </Grid>
                            )}
                        </Grid>

                        <Button type="submit" variant="outlined" color='success' sx={{ width: '100%', mt: 3 }} disabled={images.length === 0}>
                            تأكيد
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
