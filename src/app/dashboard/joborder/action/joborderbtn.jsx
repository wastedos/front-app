import * as React from 'react';
import Menu from '@mui/material/Menu';
import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormUpdate from './formupdate';
import FormDelete from './formdelete';
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function JobOrderbtn({ itemId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    try {
      const response = await fetch(`http://localhost:5000/joborders/bills-byid/${itemId}`, {
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
      console.log('Job order archived and deleted successfully:', result);

      // يمكن إضافة أي منطق إضافي هنا (مثل تحديث واجهة المستخدم)
      alert('تم أرشفة الفاتورة بنجاح!');
    } catch (error) {
      console.error('Error archiving and deleting job order:', error);
      alert(`حدث خطأ في معالجة الطلب: ${error.message}`);
    } finally {
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
        <Box sx={{display:"flex", flexDirection:'column',}}>
          <IconButton sx={{mx:1}}  onClick={handleArchiveAndDelete}>
            <ReceiptIcon />
          </IconButton>
          <FormUpdate itemId={itemId}/>
          <FormDelete itemId={itemId}/>
        </Box>

      </Menu>
    </div>
  );
}
