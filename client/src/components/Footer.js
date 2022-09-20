import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Footer = () => {
    return (
        <footer className="relative bg-stone-900 bottom-0 z-9" aria-labelledby="footer-heading">
            <div className="align-middle mt-4 border-t border-stone-500 pt-8 md:flex md:items-center md:justify-center">
                <p className="mt-8 px-5 text-base text-gray-400 md:mt-0 md:order-1 text-center">
                    &copy; {new Date().getFullYear()} Darie-Dragoș Mitoiu, All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;