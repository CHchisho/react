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
      <h2 className="text-[1.8em] mb-4 pb-2 border-b-2 border-accent inline-block">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-bg-secondary p-8 rounded-lg max-w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-8"
      >
        <div className="mb-4">
          <label
            htmlFor="loginusername"
            className="block mb-2 text-text-muted font-medium"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            className="w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="loginpassword"
            className="block mb-2 text-text-muted font-medium"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 text-base rounded-lg border border-accent font-medium font-[inherit] bg-transparent text-accent cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-text-primary focus:outline-2 focus:outline-accent-hover focus:outline-offset-2"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
