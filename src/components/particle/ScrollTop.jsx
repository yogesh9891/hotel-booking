import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollTop() {
    let location = useLocation();
    useEffect(() => {
        scrollToTop();
    }, [location.pathname])

    const scrollToTop=()=>{
        window.scrollTo(0,0)
    }
    
}

export default ScrollTop;