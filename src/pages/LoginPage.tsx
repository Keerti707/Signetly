import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F4FF] px-6 py-10 text-gray-800">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-violet-100 lg:grid-cols-2">
        <section className="relative hidden bg-gradient-to-br from-violet-500 via-fuchsia-400 to-rose-400 p-10 text-white lg:block">
          <Link to="/" className="heading-font text-3xl font-bold">
            ✍️ Signora
          </Link>

          <div className="mt-28">
            <p className="mb-5 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              ✨ Welcome back
            </p>

            <h1 className="heading-font text-5xl font-bold leading-tight">
              Your documents are waiting to be signed.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/85">
              Continue managing uploads, signatures, shared links, and audit
              trails from your secure workspace.
            </p>
          </div>

          <div className="absolute bottom-10 right-10 rounded-3xl bg-white p-5 text-gray-800 shadow-xl">
            <p className="text-sm font-semibold text-gray-400">Today</p>
            <p className="heading-font mt-1 text-3xl font-bold">12 docs</p>
            <p className="mt-1 text-sm text-emerald-500">✓ 8 completed</p>
          </div>
        </section>

        <section className="p-8 sm:p-12">
          <Link
            to="/"
            className="heading-font mb-10 inline-block text-3xl font-bold text-violet-600 lg:hidden"
          >
            ✍️ Signora
          </Link>

          <div>
            <h2 className="heading-font text-4xl font-bold text-gray-900">
              Login to your account
            </h2>
            <p className="mt-3 text-gray-500">
              Enter your details to access your signing dashboard.
            </p>
          </div>

          <form className="mt-10 space-y-5">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-[#F7F4FF] px-5 py-4 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-gray-200 bg-[#F7F4FF] px-5 py-4 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" className="h-4 w-4 accent-violet-500" />
                Remember me
              </label>

              <button type="button" className="font-semibold text-violet-600">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-violet-500 px-6 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-600"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-bold text-rose-500">
              Create one
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;