import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';
import type {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister} = useUser();

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async (inputs: Record<string, string>) => {
    console.log(inputs);
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('Register result:', registerResult);
      alert('Registration successful! You can now login.');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doRegister, initValues);

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerusername">Username</label>
          <input
            name="username"
            type="text"
            id="registerusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
