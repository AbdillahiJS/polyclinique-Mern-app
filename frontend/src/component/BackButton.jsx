import React, { useEffect } from 'react';

const DisableBackButton = () => {
  useEffect(() => {
    // Push a dummy state to the history stack
    window.history.pushState(null, document.title, window.location.href);
    console.log(window.location.href);

    const handlePopState = (event) => {
      // Push another dummy state to prevent back navigation
      window.history.pushState(null, document.title, window.location.href);
    };

    // Add event listener for popstate
    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DisableBackButton;