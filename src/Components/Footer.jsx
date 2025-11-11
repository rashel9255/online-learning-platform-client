import React from "react";
import { FaFacebook,FaGithub,FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoImg from "../assets/patshala360-logo.png";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" },
        ],
        courses: [
            { name: "Web Development", href: "/courses/web-development" },
            { name: "Data Science", href: "/courses/data-science" },
            { name: "Design", href: "/courses/design" },
            { name: "Business", href: "/courses/business" },
            { name: "Marketing", href: "/courses/marketing" },
        ],
        support: [
            { name: "Help Center", href: "/help" },
            { name: "FAQs", href: "/faq" },
            { name: "Student Support", href: "/student-support" },
            { name: "Instructor Support", href: "/instructor-support" },
            { name: "System Status", href: "/status" },
        ],
        resources: [
            { name: "Become an Instructor", href: "/teach" },
            { name: "Teaching Resources", href: "/teaching-resources" },
            { name: "Free Resources", href: "/free-resources" },
            { name: "Affiliate Program", href: "/affiliate" },
            { name: "Partnerships", href: "/partnerships" },
        ],
        legal: [
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "Accessibility", href: "/accessibility" },
            { name: "Sitemap", href: "/sitemap" },
        ],
    };

    const socialLinks = [
        { name: "Facebook", icon: <FaFacebook />, href: "https://web.facebook.com/mohammadrashel.mohammodrashel" },
        { name: "Github", icon: <FaGithub />, href: "https://github.com/rashel9255" },
        { name: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/in/mohammad-rashel-2197322b2/" },
        { name: "Instagram", icon: <FaInstagram />, href: "#" },
        { name: "YouTube", icon: <FaYoutube />, href: "#" },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-white font-bold text-xl"><img src={logoImg} alt="" /></div>
                            <span className="ml-3 text-2xl font-bold text-white">Pathshala360</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering learners worldwide with quality education. Join millions of students learning new skills and advancing their careers with our expert-led courses.
                        </p>

                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Courses</h3>
                        <ul className="space-y-2">
                            {footerLinks.courses.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <div className="text-gray-400 text-sm text-center md:text-left">© {currentYear} PatShala360. All rights reserved.</div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition text-xl"
                                    aria-label={social.name}
                                    target="_blank"
                                    
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {footerLinks.legal.slice(0, 3).map((link, index) => (
                                <React.Fragment key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition">
                                        {link.name}
                                    </a>
                                    {index < 2 && <span className="text-gray-700">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
}
