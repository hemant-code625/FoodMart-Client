import React, { Suspense } from 'react';

const LoadHome = React.lazy(() => import('../pages/Home'));

function LazyHome() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoadHome />
      </Suspense>
    </div>
  );
}

export default LazyHome;
