export default function Home() {
  return (
    <main className="min-h-screen w-full bg-zinc-900 font-sans">


      {/* nav_Section */}
  <nav className="
       sticky top-0  
       w-full  
       bg-zinc-900
       border-b border-zinc-700 
       py-4 px-6 mb-12 
       z-50">

  <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

    {/* logo_Section*/}
    <a href="#" className="text-xl font-bold tracking-wide text-white hover:text-zinc-400 transition">
      ZKM
    </a>


    {/* nav_Links */}
    <div className="flex items-center gap-6 text-sm">
      <a href="#about" className="hover:text-white transition text-zinc-500 font-bold">
        ABOUT
      </a>
      <a href="#techstack" className="hover:text-white transition text-zinc-500 font-bold">
        TECH STACK
      </a>
      <a href="#projects" className="hover:text-white transition text-zinc-500 font-bold">
        PROJECTS
      </a>
      <a href="#contact" className="hover:text-white transition text-zinc-500 font-bold">
        CONTACT
      </a>
    </div>
  </div>
</nav>

     
      {/* about_Section */} 
 <section id="about" className="scroll-mt-24 mb-20 px-6 py-6">
  
  <h1 className=" font-pixel text-2xl text-center  mb-8 text-white">About</h1>

<div className="border-b border-zinc-700 p-6 md:p-40 flex flex-col md:flex-row items-center justify-between gap-6 mx-auto">
    <div>
      <h2 className="text-2xl mb-4 font-pixel text-white">Zef Kevin A. Montera</h2>
      <h3 className="text-zinc-500 text-xl mb-4 font-bold">Second Year BSIT Student|Web Developer</h3>
      <p className="text-zinc-500 text-lg">
        I am a 2nd Year BSIT Student passionate about building clean, modern frontend web experiences. Currently exploring JavaScript HTML, Next.Js, Java, Kotlin, and Firebase. I am eager to learn and grow as a developer, and I am always looking for new challenges and opportunities to improve my skills and I believe learning is a continuous journey of turning curiosity into creation.
      </p>
    </div>

    <div className="shrink-0">
      <img 
        src="/profile.jpg" 
        alt="Zef Kevin A. Montera" 
        className="w-56 h-72 object-cover rounded-md border border-zinc-800"
      />
    </div>
  </div>

</section>


      {/* tech_stack_Section */}
<section id="techstack" className="scroll-mt-24 mb-20 px-6 py-6">
  
  <h1 className=" font-pixel text-2xl text-center text-white">Tech Stack</h1>

  <div className="p-6 md:p-40 mx-auto border-b border-zinc-700">

        <h1 className="font-bold text-2xl text-white py-8">Languages & Frameworks:</h1>
    <div className="flex flex-wrap gap-4 items-center">
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">JAVA</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">KOTLIN</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">JAVASCRIPT</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">TYPESCRIPT</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">HTML</span>  
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">CSS|TAILWIND CSS</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">NEXT.JS</span>
    </div>

        <h1 className="font-bold text-2xl py-8 text-white">Tools & Workflow:</h1>
    <div className="flex flex-wrap gap-4 items-center">
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">GIT & GITHUB</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">FIGMA</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">VS CODE</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">ANDROID STUDIO</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">GEMINI PRO</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">CLAUDE SONNET 5.5</span>
    </div>

       <h1 className="font-bold text-2xl py-8 text-white">Databases & Cloud:</h1>
    <div className="flex flex-wrap gap-4 items-center">
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">FIREBASE</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">VERCEL</span>
      <span className="text-md font-bold  text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">NETLIFY</span>
    </div>

  </div>

</section>


      {/* projects_Section */}
   <section id="projects" className="scroll-mt-39 mb-20 px-6 py-6 border-b border-zinc-700">

         <h1 className=" font-pixel text-2xl text-center  mb-8 text-white">Projects</h1>

      <div className="px-6 md:px-24 py-12 max-w-4xl mx-auto">


       {/* World Explorer */}
        <div className="border border-zinc-700 px-6 py-6 rounded-lg">
         <h1 className="text-white text-2xl font-bold mb-4">World Explorer</h1>
         <div className="flex flex-wrap gap-4 justify-start items-center mb-4">
          <h2 className="text-lg mb-4 mt-4 text-zinc-500 font-bold">Built with:</h2>
          <span className="font-bold text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">HTML</span>
          <span className="font-bold text-zinc-500 px-3 py-1.5 rounded border hover:text-white transition">CSS</span>
         </div>
         <p className="text-lg mb-4 text-zinc-500">World Explorer is an interactive travel and discovery web application designed to showcase iconic global landmarks, including the Great Wall of China, Petra, and Machu Picchu. Built with HTML and CSS, the application features a clean layout, structured destination cards, responsive navigation, and a dedicated contact section.</p>
      
         <a href="https://firstwebsite-git-main-zef-kevin-a-monteras-projects.vercel.app/"
          target="_blank" rel="noopener noreferrer" className="
          text-lg 
          border
          font-bold
          text-zinc-500
          px-2 py-1 
          hover:text-white transition
          rounded">View Project</a>
  
        </div> 

      </div>
    </section>


      {/* Contact_Section */}
      <section id="contact"
      className="scroll-mt-24 mb-20 px-6 py-6">

         <h1 className=" font-pixel text-2xl text-center  mb-6 text-white">Contact</h1>

        <div className="gap-4 flex flex-col sm:flex-row items-center justify-center p-6 md:p-40 mx-auto">

          <a href="https://github.com/zefkevinmontera" 
          target="_blank" rel="noopener noreferrer" className="
          w-full sm:w-auto text-center
          font-bold
          rounded border
          text-xl 
          text-zinc-500
          px-2 py-1 
          hover:text-white transition
          rounded">GitHub</a>

          <a href="https://www.facebook.com/Soy.kappa/" 
          target="_blank" rel="noopener noreferrer" className="
          w-full sm:w-auto text-center
          font-bold
          rounded border
          text-xl 
          text-zinc-500
          px-2 py-1 
          hover:text-white transition
          rounded">Facebook</a>

          <a href="https://www.linkedin.com/in/zef-kevin-a-montera-04941914b/?isSelfProfile=true" 
          target="_blank" rel="noopener noreferrer" className="
          w-full sm:w-auto text-center
          font-bold
          rounded border
          text-xl 
          text-zinc-500
          px-2 py-1 
          hover:text-white transition
          rounded">LinkedIn</a>

          <a href="mailto:plazajill0@gmail.com" 
          target="_blank" rel="noopener noreferrer" className="
          w-full sm:w-auto text-center
          font-bold
          rounded border
          text-xl 
          text-zinc-500
          px-2 py-1
          hover:text-white transition
          rounded">Email</a>
        </div>
      </section>


      {/* Footer_Section */}

      <section>
       <footer className="py-4 px-6 border-t border-zinc-700">
        <div className="text-center text-white">
          <p>&copy; 2026 Zef Kevin A. Montera. All rights reserved.</p>
        </div>
       </footer>
      </section>
    </main>
  );
}