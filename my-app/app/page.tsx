export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-900">


      {/* nav_Section */}
<nav className="
       sticky top-0  
       w-full  
       bg-gray-900
       border-b border-pink-600 
       py-4 px-6 mb-12 
       z-50">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    

    {/* logo_Section*/}
    <a href="#" className="text-xl font-bold tracking-wide text-white hover:text-pink-400 transition">
      Zef<span className="text-pink-600">.dev</span>
    </a>


    {/* nav_Links */}
    <div className="flex items-center gap-6 text-xl">
      <a href="#about" className="hover:text-pink-600 transition font-bold">
        About
      </a>
      <a href="#techstack" className="hover:text-pink-600 transition font-bold">
        Tech Stack
      </a>
      <a href="#projects" className="hover:text-pink-600 transition font-bold">
        Projects
      </a>
      <a href="#contact" className="hover:text-pink-600 transition font-bold">
        Contact
      </a>
    </div>

  </div>
</nav>

     
      {/* about_Section */} 
 <section id="about" className="scroll-mt-24 mb-20 px-6">
  
  <h1 className="text-4xl text-center font-bold mb-8 text-white">About</h1>

  <div className="border border-pink-600 p-35 rounded-lg bg-gray-900 flex flex-col md:flex-row items-center justify-between gap-6 mx-auto">
    <div>
      <h2 className="text-gray-400 text-2xl font-bold mb-4">Hello! I am</h2>
      <h3 className="text-3xl mb-4 font-bold text-white">Zef Kevin A. Montera</h3>
      <h4 className="text-pink-500 text-xl mb-4 font-bold">Second Year BSIT Student|Web Developer</h4>
      <p className="text-gray-300 text-lg">
        I am a 2nd Year BSIT Student passionate about building clean, modern frontend web experiences. Currently exploring JavaScript HTML, Next.Js, Java, Kotlin, and Firebase. I am eager to learn and grow as a developer, and I am always looking for new challenges and opportunities to improve my skills and I believe learning is a continuous journey of turning curiosity into creation.
      </p>
    </div>

    <div className="shrink-0">
      <img 
        src="/profile.jpg" 
        alt="Zef Kevin A. Montera" 
        className="w-56 h-72 object-cover rounded-md border border-pink-600"
      />
    </div>
  </div>

</section>


      {/* tech_stack_Section */}
     <section id="techstack" className="scroll-mt-24 mb-20 px-6">
  
  <h1 className="text-4xl text-center font-bold mb-8 text-white">Tech Stack</h1>

  <div className="p-40 mx-auto border border-pink-800 p-8 rounded-xl bg-slate-900">
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <span className="text-xl bg-blue-900 text-blue-300 px-3 py-1.5 rounded">Java</span>
      <span className="text-xl bg-yellow-900 text-yellow-300 px-3 py-1.5 rounded">Kotlin</span>
      <span className="text-xl bg-red-900 text-red-300 px-3 py-1.5 rounded">Firebase</span>
      <span className="text-xl bg-green-900 text-green-300 px-3 py-1.5 rounded">JavaScript</span>
      <span className="text-xl bg-purple-900 text-purple-300 px-3 py-1.5 rounded">HTML</span>
      <span className="text-xl bg-orange-900 text-orange-300 px-3 py-1.5 rounded">CSS</span>
      <span className="text-xl bg-black text-white px-3 py-1.5 rounded border border-zinc-700">Next.JS</span>
    </div>
  </div>

</section>


      {/* projects_Section */}
    <section id="projects"
     className="scroll-mt-24 mb-20 px-6">

         <h1 className="text-4xl text-center font-bold mb-8 text-white">Projects</h1>

      <div className="p-6 max-w-8xl mx-auto border border-pink-800 rounded-xl bg-slate-900">


       {/* World Explorer */}
        <div className="border border-pink-600 p-6 rounded-lg bg-black-900 mb-6 mt-6">
         <h1 className="text-white text-xl font-bold mb-4">World Explorer</h1>
         <div className="flex flex-wrap gap-4 justify-start items-center mb-4">
          <h2 className="text-lg mb-4 mt-4 text-gray-400">Built with:</h2>
          <span className="text-lg bg-purple-900 text-purple-300 px-3 py-1.5 rounded">HTML</span>
          <span className="text-lg bg-orange-900 text-orange-300 px-3 py-1.5 rounded">CSS</span>
         </div>
         <p className="text-lg mb-4">World Explorer is an interactive travel and discovery web application designed to showcase iconic global landmarks, including the Great Wall of China, Petra, and Machu Picchu. Built with HTML and CSS, the application features a clean layout, structured destination cards, responsive navigation, and a dedicated contact section.</p>
         <a href="https://github.com/zefkevinmontera/first_website.git"
          target="_blank" rel="noopener noreferrer" className="
          text-lg 
          bg-black
          border border-pink-600
          text-pink-600
          px-2 py-1 
          rounded">View Project</a>
        </div> 

      </div>
    </section>


      {/* contact_Section */}
      <section id="contact"
      className="scroll-mt-24 mb-20 px-6 ">

         <h1 className="text-4xl text-center font-bold mb-8 text-white">Contact</h1>

        <div className="gap-6 flex flex-row items-center justify-center p-40 mx-auto border border-pink-800 p-8 rounded-xl bg-slate-900">

          <a href="https://github.com/zefkevinmontera" 
          target="_blank" rel="noopener noreferrer" className="
          text-xl 
          bg-black 
          text-gray-500
          px-2 py-1 
          rounded">GitHub</a>

          <a href="https://www.facebook.com/Soy.kappa/" 
          target="_blank" rel="noopener noreferrer" className="
          text-xl 
          bg-blue-900
          text-blue-400
          px-2 py-1 
          rounded">Facebook</a>

          <a href="https://www.linkedin.com/in/zef-kevin-a-montera-04941914b/?isSelfProfile=true" 
          target="_blank" rel="noopener noreferrer" className="
          text-xl 
          bg-blue-400
          text-blue-200
          px-2 py-1 
          rounded">LinkedIn</a>

        </div>
      </section>
    </main>
  );
}