import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">WhosNext</h1>
        <p className="text-xl mb-12 text-gray-300">
          Connect with random people around the world in just one click
        </p>
        
        <Link 
          href="/chat" 
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full transition-colors duration-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Start Chat
        </Link>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Random Connections</h2>
            <p className="text-gray-400">Meet new people from around the world with our random matching algorithm.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Secure & Private</h2>
            <p className="text-gray-400">Your privacy is our priority with end-to-end encrypted video calls.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">High Quality</h2>
            <p className="text-gray-400">Experience crystal clear video and audio with our advanced streaming technology.</p>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} WhosNext. All rights reserved.</p>
      </footer>
    </div>
  );
}
