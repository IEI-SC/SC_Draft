import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-brand-text-muted">
          &copy; {new Date().getFullYear()} IEI RCCIIT Student Chapter. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;