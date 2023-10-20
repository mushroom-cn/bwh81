import { Outlet, useLocation } from 'react-router-dom';

export default function MainFunctions() {
  const location = useLocation();
  return (
    <>
      {JSON.stringify(location)} <Outlet />
    </>
  );
}
