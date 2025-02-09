"use client"
import * as React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Langbtn() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams(); // الحصول على معلمات الاستعلام

    // استخراج اللغة الحالية من المسار
    const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';

    // التبديل بين اللغتين
    const toggleLocale = () => {
        const newLocale = currentLocale === 'en' ? 'ar' : 'en';
        const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        
        // الحصول على المعلمات الحالية
        const queryParams = searchParams.toString();

        // بناء الرابط الجديد مع المعلمات الحالية
        const newUrl = queryParams ? `${newPathname}?${queryParams}` : newPathname;

        router.push(newUrl); // التنقل إلى المسار الجديد مع اللغة الجديدة
    };

    return (
        <Box sx={{display:'flex'}}>
            <IconButton
                aria-label="Toggle Language"
                onClick={toggleLocale}
            >
                <LanguageIcon/>
            </IconButton>
        </Box>
    );
}



/*
"use client"
import * as React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname, useRouter } from 'next/navigation';

export default function Langbtn() {
    const router = useRouter();
    const pathname = usePathname();

    // استخراج اللغة الحالية من المسار
    const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';

    // التبديل بين اللغتين
    const toggleLocale = () => {
        const newLocale = currentLocale === 'en' ? 'ar' : 'en';
        const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPathname); // التنقل إلى المسار الجديد مع اللغة الجديدة
    };

    return (
        <Box sx={{display:'flex'}}>
            <IconButton
                aria-label="Toggle Language"
                onClick={toggleLocale}
            >
                <LanguageIcon/>
            </IconButton>
        </Box>
    );
}
*/