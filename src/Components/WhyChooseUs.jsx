import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Headphones } from "lucide-react";

const features = [
    {
        id: 1,
        icon: <BookOpen className="w-10 h-10 text-primary" />,
        title: "Expert Instructors",
        desc: "Learn from experienced educators and professionals who know how to teach effectively.",
    },
    {
        id: 2,
        icon: <Users className="w-10 h-10 text-primary" />,
        title: "Interactive Learning",
        desc: "Engage with teachers and students in live discussions and hands-on projects.",
    },
    {
        id: 3,
        icon: <Award className="w-10 h-10 text-primary" />,
        title: "Certified Courses",
        desc: "Earn certificates that boost your resume and open new career opportunities.",
    },
    {
        id: 4,
        icon: <Headphones className="w-10 h-10 text-primary" />,
        title: "24/7 Support",
        desc: "Get instant help from our dedicated support team whenever you need assistance.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                    Why <span className="text-primary">Choose Us</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition p-6"
                        >
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
