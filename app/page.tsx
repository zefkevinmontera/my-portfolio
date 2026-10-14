export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-900 text-white">

      {/* Nav Section */}
      <nav className="sticky top-0  w-full  bg-gray-90/80 border-b border-pink-800 py-4 px-6 mb-12 backdrop-blur-md z-50">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    
    {/* Logo*/}
    <a href="#" className="text-xl text-lg font-bold tracking-wide text-white hover:text-pink-400 transition">
      Zef<span className="text-pink-500">.dev</span>
    </a>

    {/* Nav Links */}
    <div className="flex items-center gap-6 text-xl text-gray-300">
      <a href="#about" className="hover:text-pink-400 transition font-bold">
        Home
      </a>
      <a href="#projects" className="hover:text-pink-400 transition font-bold">
        Skills
      </a>
      <a href="#contact" className="hover:text-pink-400 transition font-bold">
        Contact
      </a>
    </div>

  </div>
</nav>

      {/* Hero Section */}
     <section className="border border-pink-800 p-6 rounded-lg mb-16 mt-12 px-6 bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
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
      className="w-56 h-72 object-cover rounded-md border border-pink-800"
    />
  </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16 mt-145">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid gap-6">
          <div className="border border-pink-800 p-6 rounded-lg bg-slate-900">
            <h3 className="text-xl font-semibold">Firebase Student App</h3>
            <p className="text-gray-400 mt-2">An Android app built with Java and Firebase Firestore to store user data in real time.</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">Java</span>
              <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">Firebase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Connect</h2>
        <p className="text-gray-400">Feel free to reach out via GitHub or Email!</p>
      </section>
    </main>
  );
}