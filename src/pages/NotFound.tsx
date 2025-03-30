
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-6 flex items-center justify-center">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="button-effect inline-block"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
