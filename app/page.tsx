export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-900 text-white">

      {/* Nav Section */}
      <nav className="sticky top-0  w-full  bg-gray-900/80 border-b border-pink-800 py-4 px-6 mb-12">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    
    {/* Logo*/}
    <a href="#" className="text-lg font-bold tracking-wide text-white hover:text-pink-400 transition">
      Zef<span className="text-pink-500">.dev</span>
    </a>

    {/* Nav Links */}
    <div className="flex items-center gap-6 text-sm text-gray-300">
      <a href="#about" className="hover:text-pink-400 transition font-bold">
        Home
      </a>
      <a href="#projects" className="hover:text-pink-400 transition font-bold">
        Projects
      </a>
      <a href="#contact" className="hover:text-pink-400 transition font-bold">
        Contact
      </a>
    </div>

  </div>
</nav>

      {/* Hero Section */}
      <section className="mb-16 mt-50 padding-x-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Zef Kevin A. Montera </h1>
        <p className="text-gray-400 text-lg">
          2nd Year BSIT Student passionate about Software Development and Web Tech.
        </p>
      </section>

      {/* Projects Section */}
      <section className="mb-16 mt-145">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid gap-6">
          <div className="border border-gray-800 p-6 rounded-lg bg-gray-800/50">
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