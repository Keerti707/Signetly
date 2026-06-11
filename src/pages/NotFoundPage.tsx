import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F4FF] px-6 text-center">
      <h1 className="heading-font text-8xl font-bold text-violet-500">
        404
      </h1>

      <p className="mt-4 text-xl text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-600"
      >
        🏠 Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;