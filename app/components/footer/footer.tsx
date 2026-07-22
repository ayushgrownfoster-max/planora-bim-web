import Link from 'next/link';

export default function Footer() {
    const footerSections = [
        {
            title: 'Services',
            links: [
                { label: 'BIM Modeling', href: '/services' },
                { label: 'BIM Coordination', href: '/services' },
                { label: 'Scan-to-BIM', href: '/services' },
                { label: '3D Visualization & Walkthroughs', href: '/services' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Careers', href: '/careers' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Settings', href: '/cookies' },
            ],
        },
    ];



    return (
        <footer className="w-full bg-background/95 text-on-background py-16 px-6 border-t border-outline-variant relative overflow-hidden">

            {/* GRID PATTERN */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                    backgroundImage: "linear-gradient(to right, #005ab3 1px, transparent 1px), linear-gradient(to bottom, #005ab3 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    zIndex: 0
                }}
            />

            {/* Main Layout Container */}
            <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">

                {/* Company Branding & Description */}
                <div className="w-full md:w-1/4 min-w-[250px] flex-shrink-0">
                    <Link href="/">
                        <h1 className="text-2xl font-bold tracking-tight mb-4 font-sans text-on-background cursor-pointer hover:text-primary transition-colors">
                            Planora BIM Services
                        </h1>
                    </Link>
                    <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
                        Delivering precision digital assets for the world's most ambitious architectural and engineering projects.
                    </p>
                </div>

                {/* Footer Link Navigation Sections */}
                <div className="w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-3 gap-8 md:justify-items-end">
                    {footerSections.map((section) => (
                        <div key={section.title} className="min-w-[140px] w-full md:max-w-[180px]">
                            <h3 className="text-sm font-semibold mb-4 font-sans text-on-background">{section.title}</h3>
                            <ul className="space-y-3 font-sans text-xs text-on-surface-variant">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Copyright & Socials Line */}
            <div className="max-w-[1440px] mx-auto w-full mt-12 pt-8 border-t border-outline-variant/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/75 font-sans relative z-10">
                <p>
                    {"© "}{new Date().getFullYear()}{" Planora BIM Services. All rights reserved."}
                </p>

                {/* Social Links Container */}

            </div>
        </footer>
    );
}