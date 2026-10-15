export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-900 text-white">

      {/* Nav Section */}
<nav className="
       sticky top-0  
       w-full  
       bg-gray-900
       border-b border-pink-600 
       py-4 px-6 mb-12 
       z-50">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    
    {/* Logo*/}
    <a href="#" className="text-xl font-bold tracking-wide text-white hover:text-pink-400 transition">
      Zef<span className="text-pink-600">.dev</span>
    </a>

    {/* Nav Links */}
    <div className="flex items-center gap-6 text-xl text-gray-300">
      <a href="#about" className="hover:text-pink-600 transition font-bold">
        About
      </a>
      <a href="#projects" className="hover:text-pink-600 transition font-bold">
        Tech Stack
      </a>
      <a href="#about" className="hover:text-pink-600 transition font-bold">
        Projects
      </a>
      <a href="#contact" className="hover:text-pink-600 transition font-bold">
        Contact
      </a>
    </div>

  </div>
</nav>

     <h1 className="text-4xl text-center justify-center font-bold mt-2">About</h1>

      {/* Hero Section */} 
  <section className="
       border border-pink-600
       p-20 
       rounded-lg 
       mb-40 mt-10 px-6
       bg-slate-900 
       flex flex-col md:flex-row
       items-center justify-between gap-6">
      <div>
        <h1 className="text-gray-600 text-2xl font-bold mb-4">Hello! I am</h1>
        <h2 className="text-3xl mb-4">Zef Kevin A. Montera </h2>
        <h3 className="text-pink-500 text-xl mb-4">Second Year BSIT Student|Web Developer</h3>
        <p className="text-white-400 text-lg">
          I am a 2nd Year BSIT Student passionate about building clean, modern frontend web experiences. Currently exploring JavaScript HTML, Java, Kotlin, and Firebase. I am eager to learn and grow as a developer, 
          and I am always looking for new challenges and opportunities to improve my skills and I believe learning is a continuous journey of turning curiosity into creation.
        </p>
      </div>

    <div className="flex-shrink-0">
      <img 
      src="/profile.jpg" 
      alt="Zef Kevin A. Montera" 
      className="w-56 h-72 object-cover rounded-md border border-pink-600"
      />
    </div>
  </section>

      {/* Tech Stack Section */}
      <section className="mb-20 mt-25 px-100 border border-pink-800 p-6 rounded-xl bg-slate-900">
       <h2 className="text-2xl font-bold mb-20 mt-20 text-center">Tech Stack</h2>
        <div className="grid gap-6">
            <div className="mt-4 flex gap-5 justify-center mb-20">
              <span className="text-xl bg-blue-900 text-blue-300 px-2 py-1 rounded">Java</span>
              <span className="text-xl bg-yellow-900 text-yellow-300 px-2 py-1 rounded">Kotlin</span>
              <span className="text-xl bg-red-900 text-red-300 px-2 py-1 rounded">Firebase</span>
              <span className="text-xl bg-green-900 text-green-300 px-2 py-1 rounded">JavaScript</span>
              <span className="text-xl bg-purple-900 text-purple-300 px-2 py-1 rounded">HTML</span>
              <span className="text-xl bg-orange-900 text-orange-300 px-2 py-1 rounded">CSS</span>
            </div>
       </div>
      </section>

      {/* Projects Section */}





      {/* Socials Section */}
      
    </main>
  );
}