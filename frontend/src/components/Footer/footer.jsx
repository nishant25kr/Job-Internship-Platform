import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { theme } = useSelector((state) => state.theme);

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Our Story', href: '/story' },
            { name: 'Careers', href: '/careers' },
            { name: 'Press', href: '/press' },
            { name: 'Contact', href: '/contact' }
        ],
        jobSeekers: [
            { name: 'Browse Jobs', href: '/jobs' },
            { name: 'Job Alerts', href: '/alerts' },
            { name: 'Resume Builder', href: '/resume-builder' },
            { name: 'Career Advice', href: '/advice' },
            { name: 'Salary Guide', href: '/salary-guide' }
        ],
        employers: [
            { name: 'Post a Job', href: '/post-job' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Talent Search', href: '/talent-search' },
            { name: 'Employer Resources', href: '/employer-resources' },
            { name: 'Success Stories', href: '/success-stories' }
        ],
        resources: [
            { name: 'Help Center', href: '/help' },
            { name: 'API Documentation', href: '/api-docs' },
            { name: 'Blog', href: '/blog' },
            { name: 'Webinars', href: '/webinars' },
            { name: 'Industry Reports', href: '/reports' }
        ]
    };

    const socialLinks = [
        {
            name: 'LinkedIn',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: 'Twitter',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            )
        },
        {
            name: 'Facebook',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    return (
        <footer className={`border-t-2 transition-all duration-300 ${theme === 'dark'
                ? 'border-gray-700 text-gray-300'
                : 'border-gray-200 text-gray-600'
            }`}>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">



                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                JobPortal
                            </h2>
                            <p className={`mt-3 text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                Connecting talented professionals with amazing opportunities. Your dream job is just a click away.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">hello@jobportal.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className={`text-lg font-semibold mb-4 capitalize ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                {category === 'jobSeekers' ? 'Job Seekers' : category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className={`text-sm transition-colors duration-200 hover:underline ${theme === 'dark'
                                                    ? 'text-gray-400 hover:text-purple-400'
                                                    : 'text-gray-600 hover:text-purple-600'
                                                }`}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* App Download Section */}
                <div className={`mb-12 p-6 rounded-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                Get our mobile app
                            </h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                Find jobs on the go with our mobile app
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${theme === 'dark'
                                    ? 'border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400'
                                    : 'border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600'
                                }`}>
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs">Download on</div>
                                    <div className="text-sm font-semibold">App Store</div>
                                </div>
                            </a>
                            <a href="#" className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${theme === 'dark'
                                    ? 'border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400'
                                    : 'border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600'
                                }`}>
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs">Get it on</div>
                                    <div className="text-sm font-semibold">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Copyright */}
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            © {currentYear} JobPortal. All rights reserved.
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap space-x-6 text-sm">
                            <a href="/privacy" className={`transition-colors ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-purple-400'
                                    : 'text-gray-500 hover:text-purple-600'
                                }`}>
                                Privacy Policy
                            </a>
                            <a href="/terms" className={`transition-colors ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-purple-400'
                                    : 'text-gray-500 hover:text-purple-600'
                                }`}>
                                Terms of Service
                            </a>
                            <a href="/cookies" className={`transition-colors ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-purple-400'
                                    : 'text-gray-500 hover:text-purple-600'
                                }`}>
                                Cookie Policy
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark'
                                            ? 'text-gray-400 hover:text-purple-400 hover:bg-gray-800'
                                            : 'text-gray-500 hover:text-purple-600 hover:bg-gray-100'
                                        }`}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
