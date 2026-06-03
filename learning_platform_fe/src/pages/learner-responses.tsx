import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import type { Response } from "../types/response";
import Loader from "../components/Loader";

function LearnerResponses() {
    const [responses, setResponses] = useState<Response[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResponses = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please login to view your responses.");
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get<Response[]>("/learners/me/responses");
                setResponses(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch responses. Have you logged in?");
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, []);

    if (loading) {
        return <Loader fullScreen />;
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-6 md:p-12">
                <div className="mt-8 bg-surface border border-border-subtle p-12 rounded-2xl text-center shadow-sm max-w-2xl mx-auto">
                    <p className="text-red-600 mb-8 font-medium text-lg">{error}</p>
                    <Link to="/login" className="inline-flex justify-center px-8 py-3 bg-primary text-surface rounded-md font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">Login to Continue</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12">
            <header className="mb-10 text-center md:text-left border-b border-border-subtle pb-8">
                 <h1 className="text-4xl md:text-5xl font-display font-medium text-ink tracking-tight">My Responses</h1>
                 <p className="mt-4 text-ink-light font-body text-lg md:text-xl">Review your past submissions and reflections across all courses.</p>
            </header>

            {responses.length === 0 ? (
                <div className="py-20 text-center text-ink-light font-display italic text-lg border border-border-subtle bg-surface-alt rounded-2xl max-w-3xl mx-auto">
                    <p>You haven't submitted any responses yet.</p>
                    <Link to="/courses" className="inline-block mt-6 text-primary font-body not-italic font-bold uppercase text-sm tracking-wider hover:underline">Browse Courses →</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {responses.map((response) => (
                        <div key={response.id} className="flex flex-col h-full border border-border-subtle rounded-2xl p-6 md:p-8 bg-surface shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group">
                            <div className="mb-6 grow">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-ink-light">Course Submission</span>
                                </div>
                                <h2 className="text-2xl font-display font-medium mb-5 text-ink group-hover:text-primary transition-colors">
                                    <Link to={`/courses/${response.course.id}`} className="focus:outline-none">
                                        {response.course.title}
                                    </Link>
                                </h2>
                                <div className="bg-surface-alt p-5 rounded-xl border border-border-subtle/50 text-ink leading-relaxed whitespace-pre-wrap font-body text-sm md:text-base">
                                    {response.content}
                                </div>
                            </div>
                            <div className="pt-5 border-t border-border-subtle flex justify-between items-center text-xs font-bold text-ink-light tracking-wider uppercase">
                                <span>{response.created_at ? new Date(response.created_at).toLocaleDateString() : 'Submitted'}</span>
                                <Link to={`/courses/${response.course.id}`} className="text-primary hover:text-primary/70 transition-colors">View Course →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LearnerResponses;