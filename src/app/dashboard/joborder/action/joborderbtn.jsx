import * as React from 'react';
import Menu from '@mui/material/Menu';
import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormUpdate from './formupdate';
import FormDelete from './formdelete';
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function JobOrderbtn({ itemId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // حالة الطلب
  const [processingRequests, setProcessingRequests] = React.useState(new Set()); // تتبع الطلبات المعالجة

  const open = Boolean(anchorEl);

  // فتح القائمة المنسدلة
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // إغلاق القائمة المنسدلة
  const handleClose = () => {
    setAnchorEl(null);
  };

  // إرسال طلب الحذف واستدعاء مسار الفواتير
  const handleArchiveAndDelete = async () => {
    // التحقق إذا كانت العملية قيد المعالجة مسبقًا
    if (processingRequests.has(itemId)) {
      alert('تم معالجة هذا الطلب مسبقًا');
      return;
    }

    // إضافة هذا الـ itemId إلى مجموعة المعالجات
    setProcessingRequests((prevRequests) => new Set(prevRequests).add(itemId));

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joborders/bills-byid/${itemId}`, {
        method: 'DELETE',
      });

      // التأكد من أن الرد جاء بنجاح
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.missingParts) {
          alert(`بعض الأجزاء غير موجودة في المخزن: ${errorData.missingParts.join(', ')}`);
        } else {
          alert(`حدث خطأ: ${errorData.error || 'خطأ غير معروف'}`);
        }
        return;
      }

      const result = await response.json();
      console.log('✅ Job order archived and deleted successfully:', result);

      // يمكن إضافة أي منطق إضافي هنا (مثل تحديث واجهة المستخدم)
      alert('تم أرشفة الفاتورة بنجاح!');
    } catch (error) {
      console.error('❌ Error archiving and deleting job order:', error);
      alert(`حدث خطأ في معالجة الطلب: ${error.message}`);
    } finally {
      setIsSubmitting(false); // ✅ إعادة التفعيل بعد انتهاء العملية
      setProcessingRequests((prevRequests) => {
        const updatedRequests = new Set(prevRequests);
        updatedRequests.delete(itemId); // إزالة الطلب من مجموعة المعالجة
        return updatedRequests;
      });
      handleClose(); // إغلاق القائمة
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ display: "flex", flexDirection: 'column' }}>
          <IconButton sx={{ mx: 1 }} onClick={handleArchiveAndDelete} disabled={isSubmitting}>
            <ReceiptIcon />
          </IconButton>
          <FormUpdate itemId={itemId} />
          <FormDelete itemId={itemId} />
        </Box>
      </Menu>
    </div>
  );
}
