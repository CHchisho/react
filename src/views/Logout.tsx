import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <>
      <h2>Logging out...</h2>
    </>
  );
};

export default Logout;
