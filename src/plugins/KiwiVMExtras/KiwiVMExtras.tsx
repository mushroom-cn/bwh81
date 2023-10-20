import { useLocation } from 'react-router-dom';

export default function KiwiVMExtras() {
  const location = useLocation();
  return <>{JSON.stringify(location)}</>;
}
