import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Link, Typography } from '@mui/material';

// Language

export default function Privacy(  ) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = () => () => {
    setOpen(true);
    setScroll();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //CheckBox
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <React.Fragment>
      <Link onClick={handleClickOpen()} sx={{textTransform:'none',cursor:'pointer',mx:1}}>الخصوصية</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">الخصوصية</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            نحن نأخذ خصوصيتك على محمل الجد. من خلال استخدامك للموقع، فإنك توافق على جمع واستخدام معلوماتك الشخصية وفقًا لهذه السياسة. نستخدم المعلومات لتحسين خدماتنا وتقديم تجربة أفضل. لا نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في حال كان ذلك ضروريًا لتقديم خدمات معينة.


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{textTransform:'none', }}>اغلاق</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
