import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/ContextHooks';
import type {Credentials} from '../types/LocalTypes';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doSubmit = async (inputs: Record<string, string>) => {
    try {
      await handleLogin(inputs as Credentials);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doSubmit, initValues);

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
