import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

type Signature = {
  type: "text" | "image";
  text: string;
  imageData?: string;
  x: number;
  y: number;
};

type Signer = {
  email: string;
  status: "Pending" | "Signed";
};

type DocumentData = {
  _id: string;
  originalName: string;
  status: string;
  signatures: Signature[];
  signers: Signer[];
};

function DocumentPage() {
  const { id } = useParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [signatureText, setSignatureText] = useState("Keerti Gupta");
  const [signatureMode, setSignatureMode] = useState<"text" | "image">("text");
  const [drawnSignature, setDrawnSignature] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [signerEmail, setSignerEmail] = useState("");
  const [signingLink, setSigningLink] = useState("");
  const [isPlacingSignature, setIsPlacingSignature] = useState(false);

  async function loadDocument() {
    const token = localStorage.getItem("token");

    const response = await api.get(`/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDocumentData(response.data.document);
    setFileUrl(response.data.fileUrl);
  }

  async function handleAddSigner() {
    try {
      if (!signerEmail.trim()) {
        toast.error("Please enter an email address.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await api.post(
        `/documents/${id}/signers`,
        { email: signerEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSigningLink(response.data.signingLink);
      setSignerEmail("");
      await loadDocument();
      toast.success("🎉 Signer added successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add signer.");
    }
  }

  function startDrawing(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    setIsDrawing(true);
  }

  function draw(event: MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#6d28d9";
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
  }

  function stopDrawing() {
    if (!isDrawing) return;

    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    setDrawnSignature(canvas.toDataURL("image/png"));
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnSignature("");
  }

  function startPlacingSignature() {
    if (signatureMode === "text" && !signatureText.trim()) {
      toast.error("Please enter signature text first.");
      return;
    }

    if (signatureMode === "image" && !drawnSignature) {
      toast.error("Please draw your signature first.");
      return;
    }

    setIsPlacingSignature(true);
    toast.success("Now click on the PDF where you want the signature.");
  }

  async function handlePlaceSignature(event: MouseEvent<HTMLDivElement>) {
    const container = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - container.left;
    const y = event.clientY - container.top;

    const token = localStorage.getItem("token");

    if (signatureMode === "text") {
      await api.post(
        `/documents/${id}/signatures`,
        {
          type: "text",
          text: signatureText,
          x,
          y,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await api.post(
        `/documents/${id}/signatures`,
        {
          type: "image",
          imageData: drawnSignature,
          x,
          y,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setIsPlacingSignature(false);
    await loadDocument();
    toast.success("Signature placed successfully!");
  }

  async function handleDownloadSignedPdf() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/documents/${id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement("a");

      link.href = url;
      link.download = `signed-${documentData?.originalName || "document.pdf"}`;

      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download signed PDF.");
    }
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (draggingIndex === null || !documentData) return;

    const container = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - container.left;
    const y = event.clientY - container.top;

    const updatedSignatures = [...documentData.signatures];

    updatedSignatures[draggingIndex] = {
      ...updatedSignatures[draggingIndex],
      x,
      y,
    };

    setDocumentData({
      ...documentData,
      signatures: updatedSignatures,
    });
  }

  async function handleMouseUp() {
    if (draggingIndex === null || !documentData) return;

    const signature = documentData.signatures[draggingIndex];
    const token = localStorage.getItem("token");

    await api.patch(
      `/documents/${id}/signatures/${draggingIndex}`,
      {
        x: signature.x,
        y: signature.y,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setDraggingIndex(null);
  }

  async function handleDeleteSignature(index: number) {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/documents/${id}/signatures/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await loadDocument();
      toast.success("Signature deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete signature.");
    }
  }

  useEffect(() => {
    loadDocument();
  }, [id]);

  return (
    <main className="min-h-screen bg-[#F7F4FF] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/dashboard" className="font-bold text-violet-600">
          ← Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="heading-font text-4xl font-bold text-slate-900">
              📄 {documentData?.originalName || "Document Preview"}
            </h1>
            <p className="mt-2 text-slate-500">
              Status: {documentData?.status || "Loading..."}
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-violet-500 px-5 py-3 text-center font-bold text-white"
            >
              Open PDF
            </a>

            <button
              onClick={handleDownloadSignedPdf}
              className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white hover:bg-emerald-600"
            >
              ⬇️ Download Signed PDF
            </button>
          </div>
        </div>

        <section className="mt-6 rounded-[2rem] bg-white p-5 shadow-2xl shadow-violet-100">
          <div className="mb-6 rounded-3xl bg-[#F7F4FF] p-5">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">
              👥 Invite Signers
            </h2>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                placeholder="Enter signer email"
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-400"
              />

              <button
                type="button"
                onClick={handleAddSigner}
                className="rounded-2xl bg-violet-500 px-6 py-3 font-bold text-white hover:bg-violet-600"
              >
                ➕ Add Signer
              </button>
            </div>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-700">
                Current Signers
              </h3>

              {documentData?.signers?.length ? (
                <div className="space-y-2">
                  {documentData.signers.map((signer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="font-medium text-slate-700">
                        📧 {signer.email}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${
                          signer.status === "Signed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {signer.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">
                  No signers have been invited yet.
                </p>
              )}
            </div>

            {signingLink && (
              <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                <p className="mb-2 font-bold text-slate-700">
                  🔗 Signing Link
                </p>

                <div className="flex gap-3">
                  <input
                    value={signingLink}
                    readOnly
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(signingLink);
                      toast.success("🔗 Signing link copied successfully!");
                    }}
                    className="rounded-xl bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-600"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mb-5 grid gap-5 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex gap-3">
                <button
                  onClick={() => setSignatureMode("text")}
                  className={`rounded-2xl px-5 py-3 font-bold ${
                    signatureMode === "text"
                      ? "bg-violet-500 text-white"
                      : "bg-[#F7F4FF] text-slate-600"
                  }`}
                >
                  Text Signature
                </button>

                <button
                  onClick={() => setSignatureMode("image")}
                  className={`rounded-2xl px-5 py-3 font-bold ${
                    signatureMode === "image"
                      ? "bg-violet-500 text-white"
                      : "bg-[#F7F4FF] text-slate-600"
                  }`}
                >
                  Draw Signature
                </button>
              </div>

              {signatureMode === "text" ? (
                <input
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="Signature text"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7F4FF] px-5 py-3 outline-none focus:border-violet-400"
                />
              ) : (
                <div>
                  <canvas
                    ref={canvasRef}
                    width={420}
                    height={150}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full cursor-crosshair rounded-2xl border-2 border-dashed border-violet-300 bg-[#F7F4FF]"
                  />

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={clearCanvas}
                      className="rounded-2xl bg-rose-100 px-5 py-3 font-bold text-rose-600"
                    >
                      Clear
                    </button>

                    <span className="flex items-center text-sm font-semibold text-slate-500">
                      Draw, then use the place button.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-[#F7F4FF] p-5">
              <p className="font-bold text-slate-700">Instructions</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose typed or drawn signature. Then click the button below and
                click once on the PDF.
              </p>

              <button
                type="button"
                onClick={startPlacingSignature}
                className={`mt-4 rounded-2xl px-5 py-3 font-bold text-white ${
                  isPlacingSignature
                    ? "bg-rose-500 hover:bg-rose-600"
                    : "bg-violet-500 hover:bg-violet-600"
                }`}
              >
                {isPlacingSignature
                  ? "Click on PDF now..."
                  : "✍️ Place Signature On PDF"}
              </button>
            </div>
          </div>

          <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative h-[800px] overflow-hidden rounded-2xl border bg-slate-100"
          >
            {fileUrl ? (
              <iframe
                src={fileUrl}
                title="PDF Preview"
                className="h-full w-full"
              />
            ) : (
              <p className="p-8">Loading PDF...</p>
            )}

            {isPlacingSignature && (
              <div
                onClick={handlePlaceSignature}
                className="absolute inset-0 z-10 cursor-crosshair bg-violet-500/10"
              />
            )}

            {documentData?.signatures?.map((signature, index) => (
              <div
                key={index}
                onMouseDown={(event) => {
                  event.stopPropagation();
                  setDraggingIndex(index);
                }}
                onClick={(event) => event.stopPropagation()}
                className="absolute z-20 cursor-grab rounded-xl border-2 border-violet-500 bg-white/95 px-5 py-3 font-bold text-violet-600 shadow-lg active:cursor-grabbing"
                style={{
                  left: signature.x,
                  top: signature.y,
                }}
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteSignature(index);
                  }}
                  className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-sm text-white shadow"
                >
                  ×
                </button>

                {signature.type === "image" && signature.imageData ? (
                  <img
                    src={signature.imageData}
                    alt="Signature"
                    className="h-16 w-40 object-contain"
                  />
                ) : (
                  <>✍️ {signature.text}</>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DocumentPage;