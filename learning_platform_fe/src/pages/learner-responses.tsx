import { useEffect, useState } from "react";

import api from "../api/axios";
import type { Response } from "../types/response";

function LearnerResponses() {
    const [responses, setResponses] = useState<
        Response[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [learnerId, setLearnerId] = useState<number | null>(() => {
        const v = localStorage.getItem("learnerId");
        return v ? Number(v) : null;
    });
    const [learnerIdInput, setLearnerIdInput] = useState("");

    useEffect(() => {
        const fetchResponses = async () => {
            if (!learnerId) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get<Response[]>(
                    `/learners/${learnerId}/responses`
                );

                setResponses(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!learnerId) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">My Responses</h1>
                <p className="mb-4">No learner id set. Please enter your learner id to view responses.</p>
                <div className="flex items-center space-x-2">
                    <input
                        value={learnerIdInput}
                        onChange={(e) => setLearnerIdInput(e.target.value)}
                        placeholder="Learner ID"
                        className="border rounded p-2"
                    />
                    <button
                        className="px-3 py-1 border rounded"
                        onClick={() => {
                            const id = Number(learnerIdInput);
                            if (Number.isInteger(id) && id > 0) {
                                localStorage.setItem("learnerId", String(id));
                                setLearnerId(id);
                                setLearnerIdInput("");
                                setLoading(true);
                            }
                        }}
                    >
                        Set
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Responses
            </h1>

            <div className="space-y-4">
                {responses.map((response) => (
                    <div
                        key={response.id}
                        className="border rounded-lg p-4"
                    >
                        <h2 className="text-xl font-semibold">
                            {response.course.title}
                        </h2>

                        <p className="text-gray-600 mt-2">
                            {response.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearnerResponses;