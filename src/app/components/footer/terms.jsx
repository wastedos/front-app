import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Link, Typography } from '@mui/material';

// Language

export default function Terms(  ) {
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
      <Link onClick={handleClickOpen()} sx={{textTransform:'none',cursor:'pointer',mx:1}}>الشروط</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">الشروط</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography>1. الموافقة على الشروط: بإنشاء حساب على موقعنا، أنت توافق على الالتزام بشروط وأحكام الاستخدام هذه. إذا كنت لا توافق على هذه الشروط، يجب عليك عدم التسجيل أو استخدام الموقع.</Typography>
            <Typography>2. التسجيل وحساب المستخدم:

يجب أن تقدم معلومات دقيقة وكاملة عند إنشاء حسابك.
يجب أن تتحمل المسؤولية عن الحفاظ على سرية بيانات حسابك (مثل اسم المستخدم وكلمة المرور).
أنت مسؤول عن جميع الأنشطة التي تحدث عبر حسابك، سواء كنت قد قمت بذلك أو لا.</Typography>
            <Typography>3. استخدام الموقع:
يحق لك استخدام الموقع فقط للأغراض القانونية والمشروعة.
يجب عليك عدم استخدام الموقع في أي نشاط غير قانوني أو مخالف للقوانين المعمول بها.
يمنع نشر أي محتوى مسيء أو ضار أو يحرض على العنف أو التمييز.</Typography>
            <Typography>4. الخصوصية وحماية البيانات:
نحن نلتزم بحماية معلوماتك الشخصية وفقًا لسياسة الخصوصية الخاصة بنا.
باستخدامك الموقع، أنت توافق على جمع واستخدام بياناتك وفقًا للسياسة الموضحة في سياسة الخصوصية.</Typography>
            <Typography>5. التعديلات على الشروط:
يحق لنا تعديل هذه الشروط في أي وقت. ستتمكن من معرفة التعديلات من خلال صفحة الشروط والأحكام، وسيتم نشر التغييرات في هذا القسم.
يُنصح بمراجعة الشروط بشكل دوري لمتابعة أي تعديلات.</Typography>
            <Typography>6. الإنهاء أو تعليق الحساب:
يحق لنا تعليق أو إلغاء حسابك إذا خالفت أيًا من هذه الشروط والأحكام.
إذا تم إنهاء حسابك، لا يحق لك استخدام خدمات الموقع مرة أخرى إلا بإذن منا.</Typography>
            <Typography>7. المحتوى وحقوق الملكية:
جميع حقوق الملكية الفكرية المتعلقة بالمحتوى المعروض على الموقع (مثل النصوص، الصور، التصاميم) هي ملك لنا أو مرخصة لنا.
لا يجوز لك نسخ أو توزيع أو تعديل أي من محتوى الموقع دون إذن مسبق.</Typography>
            <Typography>8. القيود والمسؤولية:
نحن غير مسؤولين عن أي خسائر أو أضرار تنشأ عن استخدامك للموقع.
لا نتحمل مسؤولية أي مشاكل تقنية أو أعطال قد تؤثر على الوصول إلى الموقع.</Typography>
            <Typography>9. روابط الأطراف الخارجية:
قد يحتوي الموقع على روابط لمواقع أخرى. نحن غير مسؤولين عن محتوى أو سياسات الخصوصية الخاصة بهذه المواقع.</Typography>
            <Typography>10. القانون الحاكم:
تخضع هذه الشروط للقوانين المحلية في (حدد الدولة/المنطقة)، وأي نزاع قد ينشأ سيكون من اختصاص المحاكم في تلك المنطقة.</Typography>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{textTransform:'none', }}>اغلاق</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
