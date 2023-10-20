import { useLocation } from 'react-router-dom';

export default function Migration() {
  const location = useLocation();
  return <>{JSON.stringify(location)}</>;
}
