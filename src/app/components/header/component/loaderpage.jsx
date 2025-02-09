"use client";
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Loaderpage() {
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNavigation = (url) => {
        setLoading(true); // Show loading indicator
        startTransition(() => {
            router.push(url); // Navigate to the new URL
            setLoading(false); // Hide loading indicator after navigation
        });
    };

    return (
        <>
            {loading && <LinearProgress />}
            {/* Example button to demonstrate navigation */}
            <button onClick={() => handleNavigation('/another-page')}>
                Go to Another Page
            </button>
        </>
    );
}
