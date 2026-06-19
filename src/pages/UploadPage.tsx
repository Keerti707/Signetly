import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please choose a PDF first.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("document", file);

      const response = await api.post("/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Upload error:", error);
      setMessage(error.response?.data?.message || error.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F4FF] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link to="/dashboard" className="font-bold text-violet-600">
          ← Back to Dashboard
        </Link>

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-2xl shadow-violet-100">
          <h1 className="heading-font text-4xl font-bold text-slate-900">
            Upload a PDF
          </h1>

          <p className="mt-2 text-slate-500">
            Choose a document to prepare it for signing.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-violet-300 bg-[#F7F4FF] p-10 text-center">
              <span className="text-5xl">📄</span>

              <span className="mt-4 font-bold text-slate-800">
                {file ? file.name : "Click to choose a PDF"}
              </span>

              <span className="mt-2 text-sm text-slate-500">
                Only PDF files are supported
              </span>

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            {message && (
              <p className="rounded-2xl bg-rose-50 p-4 text-center font-semibold text-rose-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full rounded-2xl bg-violet-500 px-6 py-4 font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-600 disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Upload Document"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default UploadPage;