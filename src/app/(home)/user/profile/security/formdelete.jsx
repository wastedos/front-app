import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

export default function FormDelete() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [deleteReason, setDeleteReason] = React.useState(""); // سبب الحذف

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(null); // إخفاء الإشعارات عند الإغلاق
  };

  // function for delete item by token
  const deleteItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // جلب التوكن من localStorage
    if (!token) {
      setMessage({ type: "error", text: "لم يتم العثور على توكن المصادقة!" });
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5000/users/delete-user", {
        headers: {
          Authorization: `Bearer ${token}`, // إرسال التوكن
        },
        data: { reason: deleteReason }, // إرسال سبب الحذف
      });

      console.log("Item deleted successfully:", response.data);
      setMessage({ type: "success", text: "تم حذف الحساب بنجاح!" });

      // حذف التوكن وتحديث الصفحة بعد الحذف
      localStorage.removeItem('token'); // إزالة التوكن
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error deleting item:", error.message);
      setMessage({ type: "error", text: "حدث خطأ أثناء الحذف!" });
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} color="error" variant="outlined" startIcon={<DeleteIcon/>}>
        حذف الحساب
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title" align="center">
          حذف الحساب
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={deleteItem}>
              <Grid container spacing={2} sx={{ width: "30rem" }}>
                <Grid size={12}>
                  <TextField
                    name="delete"
                    label="سبب الحذف"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    required
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                  />
                </Grid>
                <Grid size={12}>
                    <Button
                    type="submit"
                    autoFocus
                    variant="contained"
                    sx={{ textTransform: "none", mt:1, width:'100%' }}
                    color="error"
                    >
                    حذف
                    </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for messages */}
      <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={message?.type} onClose={handleClose}>
          {message?.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
