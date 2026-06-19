import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

type DocumentData = {
  _id: string;
  originalName: string;
  status: string;
};

function SignDocumentPage() {
  const { token } = useParams();

  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [signatureText, setSignatureText] = useState("");

  async function loadSharedDocument() {
    const response = await api.get(`/documents/sign/${token}`);
    setDocumentData(response.data.document);
    setFileUrl(response.data.fileUrl);
  }

  async function handleSign(event: MouseEvent<HTMLDivElement>) {
    try {
      if (!signerEmail.trim()) {
        toast.error("Enter your invited email first.");
        return;
      }

      if (!signatureText.trim()) {
        toast.error("Enter your signature text first.");
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      await api.post(`/documents/sign/${token}/signature`, {
        signerEmail,
        type: "text",
        text: signatureText,
        x,
        y,
      });

      toast.success("Document signed successfully!");
      await loadSharedDocument();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not sign document.");
    }
  }

  useEffect(() => {
    loadSharedDocument();
  }, [token]);

  return (
    <main className="min-h-screen bg-[#F7F4FF] p-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-violet-600">
            ✍️ Shared Signing Page
          </h1>

          <p className="mt-3 text-slate-500">
            Document: {documentData?.originalName || "Loading..."}
          </p>

          <p className="mt-1 text-slate-500">
            Status: {documentData?.status || "Loading..."}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="email"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              placeholder="Enter your invited email"
              className="rounded-2xl border border-slate-200 bg-[#F7F4FF] px-5 py-3 outline-none"
            />

            <input
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              placeholder="Type your signature"
              className="rounded-2xl border border-slate-200 bg-[#F7F4FF] px-5 py-3 outline-none"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Enter the email that was invited, type your signature, then click
            once on the PDF where you want to sign.
          </p>

          <div
            onClick={handleSign}
            className="relative mt-8 h-[800px] overflow-hidden rounded-2xl border bg-slate-100 cursor-crosshair"
          >
            {fileUrl ? (
              <iframe
                src={fileUrl}
                className="pointer-events-none h-full w-full"
                title="Shared PDF"
              />
            ) : (
              <p className="p-8">Loading PDF...</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default SignDocumentPage;