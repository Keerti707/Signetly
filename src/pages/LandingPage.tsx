import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4FF] text-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="heading-font text-3xl font-bold text-violet-600">
          Signetly✨
        </Link>

        <div className="hidden items-center gap-8 font-semibold text-slate-600 md:flex">
          <a href="#features" className="hover:text-violet-600">Features</a>
          <a href="#workflow" className="hover:text-violet-600">Workflow</a>
          <a href="#security" className="hover:text-violet-600">Security</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="font-semibold text-slate-600 hover:text-violet-600">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-violet-500 px-5 py-2.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-600"
          >
            Start Free
          </Link>
        </div>
      </nav>

      <section className="relative mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-2">
        <div className="absolute left-10 top-20 h-36 w-36 rounded-full bg-rose-300/40 blur-3xl" />
        <div className="absolute bottom-16 right-10 h-44 w-44 rounded-full bg-teal-300/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-32 w-32 rounded-full bg-yellow-300/40 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-violet-600 shadow-sm">
            ✨ Cute UI. Serious document workflows.
          </div>

          <h1 className="heading-font max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Send, sign & track PDFs without paperwork drama.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A modern e-signature platform for securely uploading documents, collecting signatures,
            sharing signing links, and tracking document workflows with complete audit visibility.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/upload"
              className="rounded-full bg-violet-500 px-8 py-4 text-center font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-600"
            >
              Upload Document
            </Link>

            <Link
              to="/dashboard"
              className="rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-center font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-rose-300 hover:text-rose-500"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
            <span>🔐 JWT Auth</span>
            <span>📄 PDF Uploads</span>
            <span>✍️ Signature Coordinates</span>
            <span>📜 Audit Logs</span>
          </div>
        </div>

        <div className="relative z-10">
          <div className="rotate-1 rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-2xl shadow-violet-200">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-400">Live Preview</p>
                <h2 className="heading-font text-2xl font-bold">NDA_Agreement.pdf</h2>
              </div>
              <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-bold text-teal-600">
                Ready
              </span>
            </div>

            <div className="rounded-3xl bg-[#F7F4FF] p-5">
              <div className="mb-6 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-teal-400" />
              </div>

              <div className="space-y-4">
                <div className="h-4 w-4/5 rounded-full bg-slate-300" />
                <div className="h-4 w-full rounded-full bg-slate-200" />
                <div className="h-4 w-3/5 rounded-full bg-slate-200" />
              </div>

              <div className="mt-10 rounded-2xl border-2 border-dashed border-violet-300 bg-white p-6 text-center shadow-sm">
                <p className="heading-font text-3xl font-bold text-violet-600">
                  Keerti Gupta
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-400">
                  Signature placed here
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-slate-400">Status</p>
                  <p className="heading-font text-xl font-bold text-rose-500">Pending</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-slate-400">Audit</p>
                  <p className="heading-font text-xl font-bold text-teal-500">Tracked</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-5 -top-5 rotate-6 rounded-2xl bg-yellow-300 px-5 py-3 font-bold shadow-lg">
            🔐 Secure
          </div>

          <div className="absolute -bottom-6 -left-4 -rotate-6 rounded-2xl bg-rose-400 px-5 py-3 font-bold text-white shadow-lg">
            ✨ Signed
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 text-center">
          <p className="font-bold text-violet-600">Features</p>
          <h2 className="heading-font mt-2 text-4xl font-bold">
            Everything needed for real document signing
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["📄", "Secure Uploads", "Upload and manage PDFs with clean document ownership."],
            ["✍️", "Drag Signatures", "Place signatures visually and save exact page coordinates."],
            ["📜", "Audit Trails", "Track who signed, when, and what changed."],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-[2rem] bg-white p-7 shadow-xl shadow-violet-100 transition hover:-translate-y-2"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F4FF] text-2xl">
                {icon}
              </div>
              <h3 className="heading-font text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default LandingPage;