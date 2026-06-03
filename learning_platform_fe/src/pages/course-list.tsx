import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import type { Course } from "../types/course";

function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get<Course[]>("/courses");
                setCourses(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="font-display text-xl tracking-widest text-ink-light uppercase">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border-subtle pb-6 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-medium text-ink">
                        Curriculum
                    </h1>
                    <p className="mt-2 text-ink-light font-body text-lg">
                        Expand your knowledge with our curated selection of courses.
                    </p>
                </div>
                <Link
                    to="/responses"
                    className="inline-flex items-center justify-center px-6 py-2 border border-ink text-ink hover:bg-ink hover:text-surface transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                >
                    My Responses
                </Link>
            </header>

            {courses.length === 0 ? (
                <div className="py-20 text-center text-ink-light font-display italic text-lg border border-border-subtle bg-surface-alt">
                    No courses available at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group flex flex-col justify-between border border-border-subtle bg-surface hover:border-primary transition-colors duration-300 p-6 md:p-8"
                        >
                            <div>
                                <h2 className="text-2xl font-display font-medium text-ink group-hover:text-primary transition-colors duration-300">
                                    {course.title}
                                </h2>
                                <div className="w-12 h-px bg-primary my-4 opacity-50"></div>
                                <p className="text-ink-light leading-relaxed line-clamp-3">
                                    {course.description}
                                </p>
                            </div>

                            <Link
                                to={`/courses/${course.id}`}
                                className="inline-flex items-center mt-8 text-sm font-semibold uppercase tracking-widest text-primary group-hover:text-ink transition-colors duration-200"
                            >
                                View Course <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseList;