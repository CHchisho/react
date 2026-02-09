import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';
import type {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async (inputs: Record<string, string>) => {
    const usernameResult = await getUsernameAvailable(inputs.username);
    const emailResult = await getEmailAvailable(inputs.email);
    setUsernameAvailable(usernameResult.available);
    setEmailAvailable(emailResult.available);
    setUsernameError(
      usernameResult.available ? null : (usernameResult.message ?? null),
    );
    setEmailError(emailResult.available ? null : (emailResult.message ?? null));
    if (!usernameResult.available || !emailResult.available) {
      return;
    }
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('Register result:', registerResult);
      alert('Registration successful! You can now login.');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const {handleInputChange: formHandleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === 'username') {
      setUsernameAvailable(true);
      setUsernameError(null);
    }
    if (e.target.name === 'email') {
      setEmailAvailable(true);
      setEmailError(null);
    }
    formHandleInputChange(e);
  };

  return (
    <>
      <h2 className="text-[1.8em] mb-4 pb-2 border-b-2 border-accent inline-block">
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-bg-secondary p-8 rounded-lg max-w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-8"
      >
        <div className="mb-4">
          <label
            htmlFor="registerusername"
            className="block mb-2 text-text-muted font-medium"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="registerusername"
            onChange={handleInputChange}
            autoComplete="username"
            className="w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50"
          />
          {!usernameAvailable && (
            <p className="mt-1 text-sm text-accent" role="alert">
              {usernameError ?? 'Username is already taken'}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="registeremail"
            className="block mb-2 text-text-muted font-medium"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
            className="w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50"
          />
          {!emailAvailable && (
            <p className="mt-1 text-sm text-accent" role="alert">
              {emailError ?? 'Email is already in use'}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="registerpassword"
            className="block mb-2 text-text-muted font-medium"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
            className="w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 text-base rounded-lg border border-accent font-medium font-[inherit] bg-transparent text-accent cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-text-primary focus:outline-2 focus:outline-accent-hover focus:outline-offset-2"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
