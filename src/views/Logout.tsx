import {useEffect} from 'react';
import {useNavigate} from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return (
    <>
      <h2>Logging out...</h2>
    </>
  );
};

export default Logout;
