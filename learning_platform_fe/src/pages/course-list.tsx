import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import type { Course } from "../types/course";
import Loader from "../components/Loader";

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
        return <Loader fullScreen />;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-border-subtle pb-6 gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-display font-medium text-ink">
                        Curriculum
                    </h1>
                    <p className="mt-3 text-ink-light font-body text-lg max-w-2xl">
                        Expand your knowledge with our curated selection of courses.
                    </p>
                </div>
                <Link
                    to="/responses"
                    className="inline-flex shrink-0 items-center justify-center px-6 py-3 border-2 border-ink text-ink hover:bg-ink hover:text-surface transition-all duration-300 text-sm uppercase tracking-widest font-bold rounded-md"
                >
                    My Responses
                </Link>
            </header>

            {courses.length === 0 ? (
                <div className="py-20 text-center text-ink-light font-display italic text-lg border border-border-subtle bg-surface-alt rounded-lg">
                    No courses available at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group flex flex-col justify-between border border-border-subtle bg-surface hover:border-primary hover:shadow-md transition-all duration-300 p-6 md:p-8 rounded-lg"
                        >
                            <div>
                                <h2 className="text-2xl font-display font-medium text-ink group-hover:text-primary transition-colors duration-300">
                                    {course.title}
                                </h2>
                                <div className="w-12 h-1 bg-primary/20 group-hover:bg-primary my-4 transition-colors duration-300 rounded-full"></div>
                                <p className="text-ink-light leading-relaxed line-clamp-3">
                                    {course.description}
                                </p>
                            </div>

                            <Link
                                to={`/courses/${course.id}`}
                                className="inline-flex items-center mt-8 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors duration-200"
                            >
                                View Course <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseList;