import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useAuthentication} from '../hooks/apiHooks';
import type {Credentials} from '../types/LocalTypes';

const LoginForm = () => {
  const navigate = useNavigate();
  const {postLogin} = useAuthentication();

  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async (inputs: Record<string, string>) => {
    console.log(inputs);
    try {
      const loginResult = await postLogin(inputs as Credentials);
      console.log('Login result:', loginResult);
      localStorage.setItem('token', loginResult.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doLogin, initValues);

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
