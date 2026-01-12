export default function Footer() {
  return (
    <footer className="bg-[#212121] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold">
                <span className="text-white">Gig</span>
                <span className="text-gray-300">Flow</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The premier platform connecting talented freelancers with clients worldwide. 
              Build your career, grow your business, and create amazing projects together.
            </p>
            <div className="text-sm text-gray-400">
              © 2024 GigFlow. All rights reserved.
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">Post a Project</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Find Freelancers</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Success Stories</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">Browse Jobs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Create Profile</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Resources</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Community</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              Made with ❤️ for the freelance community
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}