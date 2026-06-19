import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

type DocumentItem = {
    _id: string;
    originalName: string;
    status: string;
    createdAt: string;
};

function DashboardPage() {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState<DocumentItem[]>([]);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    async function fetchDocuments() {
        const token = localStorage.getItem("token");

        const response = await api.get("/documents", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setDocuments(response.data.documents);
    }

    async function handleDeleteDocument(documentId: string) {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/documents/${documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Document deleted successfully.");
            await fetchDocuments();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete document.");
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <main className="min-h-screen bg-[#F7F4FF] px-6 py-8">
            <div className="mx-auto max-w-6xl">
                <nav className="flex items-center justify-between">
                    <Link to="/" className="heading-font text-3xl font-bold text-violet-600">
                       Signetly✨
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="rounded-full bg-white px-5 py-2.5 font-bold text-rose-500 shadow"
                    >
                        Logout
                    </button>
                </nav>

                <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-2xl shadow-violet-100">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <p className="font-bold text-violet-600">Dashboard</p>
                            <h1 className="heading-font mt-2 text-4xl font-bold text-slate-900">
                                Welcome, {user.name || "User"} 👋
                            </h1>
                            <p className="mt-2 text-slate-500">
                                Manage your uploaded documents and prepare them for signing.
                            </p>
                        </div>

                        <Link
                            to="/upload"
                            className="rounded-2xl bg-violet-500 px-6 py-4 text-center font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-600"
                        >
                            + Upload PDF
                        </Link>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="heading-font text-3xl font-bold text-slate-900">
                        Your Documents
                    </h2>

                    {documents.length === 0 ? (
                        <div className="mt-6 rounded-[2rem] bg-white p-10 text-center shadow-xl shadow-violet-100">
                            <p className="text-5xl">📭</p>
                            <h3 className="heading-font mt-4 text-2xl font-bold">
                                No documents yet
                            </h3>
                            <p className="mt-2 text-slate-500">
                                Upload your first PDF to begin.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-5">
                            {documents.map((document) => (
                                <div
                                    key={document._id}
                                    className="flex flex-col justify-between gap-4 rounded-[2rem] bg-white p-6 shadow-xl shadow-violet-100 transition hover:-translate-y-1 md:flex-row md:items-center"
                                >
                                    <Link to={`/document/${document._id}`} className="flex-1">
                                        <h3 className="heading-font text-2xl font-bold text-slate-900">
                                            📄 {document.originalName}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Uploaded on{" "}
                                            {new Date(document.createdAt).toLocaleDateString()}
                                        </p>
                                    </Link>

                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${document.status === "Signed"
                                                    ? "bg-green-100 text-green-700"
                                                    : document.status === "Partially Signed"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {document.status}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteDocument(document._id)}
                                            className="rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default DashboardPage;