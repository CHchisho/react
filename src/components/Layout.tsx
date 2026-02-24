import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const {user} = useUserContext();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <nav className="w-full box-border bg-bg-secondary px-8 py-4 border-b border-border">
        <ul className="list-none m-0 p-0 flex gap-8">
          <li>
            <Link
              to="/"
              className="text-text-muted font-semibold py-2 px-4 rounded transition-colors duration-200 hover:text-text-primary hover:bg-accent"
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="text-text-muted font-semibold py-2 px-4 rounded transition-colors duration-200 hover:text-text-primary hover:bg-accent"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-text-muted font-semibold py-2 px-4 rounded transition-colors duration-200 hover:text-text-primary hover:bg-accent"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="text-text-muted font-semibold py-2 px-4 rounded transition-colors duration-200 hover:text-text-primary hover:bg-accent"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-text-muted font-semibold py-2 px-4 rounded transition-colors duration-200 hover:text-text-primary hover:bg-accent"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main className="p-8 w-full box-border flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
