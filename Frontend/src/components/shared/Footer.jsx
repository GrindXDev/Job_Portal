import React from 'react'
import { Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center gap-6">
                    {/* Facebook */}
                    <a 
                        href="https://www.facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors"
                    >
                        <Facebook className="w-6 h-6" />
                    </a>
                    
                    {/* Twitter */}
                    <a 
                        href="https://www.twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                    >
                        <Twitter className="w-6 h-6" />
                    </a>
                    
                    {/* LinkedIn */}
                    <a 
                        href="https://www.linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer