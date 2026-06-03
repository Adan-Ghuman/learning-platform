import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";

import api from "../api/axios";
import type { Course } from "../types/course";
import Loader from "../components/Loader";
import SubmittedDialog from "../components/SubmittedDialog";

function CourseDetail() {
    const { id } = useParams();

    const [course, setCourse] = useState<Course | null>(
        null
    );

    const [loading, setLoading] = useState(true);

    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [learnerId, setLearnerId] = useState<number | null>(() => {
        const v = localStorage.getItem("learnerId");
        return v ? Number(v) : null;
    });
    const [learnerIdInput, setLearnerIdInput] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get<Course>(
                    `/courses/${id}`
                );

                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!content.trim() || !course) return;

        if (!learnerId) {
            setMessage("Please set your learner id before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            setMessage("");
            setIsError(false);

            await api.post("/responses", {
                learner_id: learnerId,
                course_id: course.id,
                content,
            });

            setContent("");
            setMessage("Response submitted successfully.");
            setIsError(false);
            setDialogOpen(true);
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
        return <Loader />;
    }

    if (!course) {
        return (
            <div className="p-6">
                Course not found.
            </div>
        );
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 md:p-8">
                <h1 className="text-4xl font-display font-medium text-ink">
                    {course.title}
                </h1>

                <p className="mt-3 text-ink-light text-lg">
                    {course.description}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >
                    <h2 className="text-2xl font-display font-medium text-ink">
                        Submit Response
                    </h2>

                    <div className="mb-2">
                        {learnerId ? (
                            <div className="flex items-center space-x-2">
                                <span>Submitting as learner ID: {learnerId}</span>
                                <button
                                    type="button"
                                    className="text-sm text-red-600 underline border-none bg-transparent hover:text-red-800 hover:bg-transparent px-0 py-0"
                                    onClick={() => {
                                        localStorage.removeItem("learnerId");
                                        setLearnerId(null);
                                        setMessage("");
                                    }}
                                >
                                    Change
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <input
                                    value={learnerIdInput}
                                    onChange={(e) => setLearnerIdInput(e.target.value)}
                                    placeholder="Learner ID"
                                    className="border rounded p-2"
                                />
                                <button
                                    type="button"
                                    className="px-3 py-1 border rounded hover:bg-primary hover:text-surface transition-colors"
                                    onClick={() => {
                                        const id = Number(learnerIdInput);
                                        if (Number.isInteger(id) && id > 0) {
                                            localStorage.setItem("learnerId", String(id));
                                            setLearnerId(id);
                                            setLearnerIdInput("");
                                            setMessage("Learner ID saved.");
                                        } else {
                                            setMessage("Invalid learner id.");
                                        }
                                    }}
                                >
                                    Set
                                </button>
                            </div>
                        )}
                    </div>

                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        rows={5}
                        placeholder="Enter your response..."
                        className="w-full"
                        required
                    />

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="hover:bg-primary hover:text-surface transition-colors duration-200"
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Response"}
                        </button>

                        {!dialogOpen && <p className="text-sm text-ink-light">{message}</p>}
                    </div>

                </form>
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