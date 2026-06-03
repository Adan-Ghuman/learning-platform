import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { isAxiosError } from "axios";

import api from "../api/axios";
import type { Course } from "../types/course";
import Loader from "../components/Loader";
import SubmittedDialog from "../components/SubmittedDialog";

function CourseDetail() {
    const { id } = useParams();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get<Course>(`/courses/${id}`);
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.trim() || !course) return;

        if (!token) {
            setMessage("Please login before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            setMessage("");
            setIsError(false);

            const { data } = await api.post("/responses", {
                course_id: course.id,
                content,
            });

            setContent("");
            setMessage("Response submitted successfully.");
            setIsError(false);
            setDialogOpen(true);

            // Update the course state with the new response so it shows immediately
            setCourse((prev) => prev ? { ...prev, response: { id: data.id, content: data.content, created_at: data.created_at } } : prev);
        } catch (error) {
            console.error(error);
            setIsError(true);
            if (isAxiosError(error) && error.response?.data) {
                const data = error.response.data as any;
                if (Array.isArray(data.errors)) {
                    setMessage(data.errors.join(", "));
                } else if (data.error) {
                    setMessage(data.error);
                } else {
                    setMessage(error.message || "Failed to submit response.");
                }
            } else if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage("Failed to submit response.");
            }
            setDialogOpen(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!course) {
        return <div className="p-6">Course not found.</div>;
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
                <header className="mb-10 border-b border-border-subtle pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md ${course.status === 'published' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-200 text-gray-700 border border-gray-300'}`}>
                            {course.status}
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-ink tracking-tight mb-5 leading-tight">
                        {course.title}
                    </h1>
                    <p className="text-ink-light text-lg md:text-xl leading-relaxed font-body">
                        {course.description}
                    </p>
                </header>

                {course.response ? (
                    <div className="mt-8 animate-in fade-in duration-500">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                            <h2 className="text-2xl font-display font-medium text-ink">Your Past Response</h2>
                            <span className="inline-flex w-max items-center text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full font-bold border border-green-200 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                Submitted
                            </span>
                        </div>
                        <div className="bg-surface-alt border border-border-subtle rounded-xl p-6 md:p-8 text-ink leading-relaxed whitespace-pre-wrap shadow-sm">
                            {course.response.content}
                            <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-bold text-ink-light tracking-wider uppercase">
                                SUBMITTED ON: {new Date(course.response.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <h2 className="text-2xl font-display font-medium text-ink">Submit Your Response</h2>

                        {!token && (
                            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 mb-6 flex items-start">
                                <svg xmlns="http://www.00000000000000000" className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div>
                                    <span className="block font-medium mb-1">Authentication Required</span>
                                    <span>You must <Link to="/login" className="underline font-bold hover:text-yellow-600 transition-colors">Login</Link> to submit a response.</span>
                                </div>
                            </div>
                        )}

                        <div className="relative">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                placeholder="Type your response or reflections here..."
                                className="w-full border border-border-subtle bg-surface rounded-lg p-5 text-ink placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-sm transition-all resize-y min-h-40"
                                required
                                disabled={!token || submitting}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <button
                                type="submit"
                                disabled={!token || submitting}
                                className="w-full sm:w-auto px-8 py-3 bg-ink text-surface font-bold uppercase tracking-widest text-sm hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-md shadow-sm flex justify-center"
                            >
                                {submitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : "Submit Response"}
                            </button>

                            {!dialogOpen && message && (
                                <p className={`text-sm font-medium ${isError ? 'text-red-500' : 'text-green-600'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>
                )}
            </div>
            <SubmittedDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                message={message}
                isError={isError}
            />
        </>
    );
}

export default CourseDetail;