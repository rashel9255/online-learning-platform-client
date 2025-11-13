import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import axios from "axios";

const TopInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://online-learning-platform-server-alpha.vercel.app/instructors/top")
            .then((res) => {
                setInstructors(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching instructors:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="py-20 text-center text-gray-600">Loading top instructors...</div>;
    }

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-4 text-primary-gradient">
                    Meet Our Top Instructors
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-500 max-w-2xl mx-auto mb-10">
                    Learn from the best educators who help you achieve your learning goals.
                </motion.p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {instructors.map((ins, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative overflow-hidden">
                                <img src={ins.avatar} alt={ins.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                    <Award className="w-10 h-10 text-yellow-400" />
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-semibold">{ins.name}</h3>
                                <p className="text-primary font-medium">{ins.bio}</p>
                                <div className="flex items-center justify-center mt-3">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <span className="ml-1 text-gray-500 font-medium">{ins.rating.toFixed(1)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopInstructors;
