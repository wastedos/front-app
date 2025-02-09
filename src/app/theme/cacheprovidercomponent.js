"use client";
import * as React from "react";
import { CacheProvider } from '@emotion/react';
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// Cache setup for RTL and LTR
const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
    key: "mui",
});

export default function CacheProviderComponent({ children, isRtl }) {
    const cache = rtlCache 

    return (
        <CacheProvider value={cache}>
            {children}
        </CacheProvider>
    );
}
