import React, { Suspense, useState, useEffect } from 'react';
import ResizeMessage from '../Components/ResizeMessage'
const LoadHome = React.lazy(() => import('../pages/Home'));

function LazyHome() {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {
        showPopup && <ResizeMessage/>
      }
      <Suspense fallback={<div>Loading...</div>}>
        <LoadHome />
      </Suspense>
    </div>
  );
}

export default LazyHome;
