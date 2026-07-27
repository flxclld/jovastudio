const projects = [
  { title: "Tepotzlan", type: "Interior Design", href: "/projects/tepotzlan", image: "https://framerusercontent.com/images/XikFZSP2z3K6hiqJjPIRdUCVux4.jpeg?width=1290&height=1797" },
  { title: "Condesa", type: "Interior Design", href: "/projects/condesa", image: "https://framerusercontent.com/images/kLOPBNpgsgCYiUYis3EaiVHPI.png?width=1402&height=1122" },
  { title: "Polanco", type: "Interior Design", href: "/projects/polanco", image: "https://framerusercontent.com/images/4DSQRsjCaeG3Td105XzixmFNUw.png?width=1000&height=802" },
  { title: "Casita Uma", type: "Interior Design", href: "/projects/casita-uma", image: "https://framerusercontent.com/images/EJzVTCJlMtAwmTQLtoQdVHXH5BA.png?width=1000&height=800" },
  { title: "Altanera Restaurant", type: "Interior Design", href: "/projects/altenera-restaurant", image: "https://framerusercontent.com/images/7ozEQqROgQkCO26Lhbw9yzj6TE.jpg?width=1290&height=1469" },
  { title: "Casa X", type: "Interior Design", href: "/projects/casa-x", image: "https://framerusercontent.com/images/8Of9s0x2otdeeCYSU4SMChRWXw.png?width=1000&height=802" },
  { title: "Meteora", type: "Interior Design", href: "/projects/meteora", image: "https://framerusercontent.com/images/HT1mRam3UFpHLIxhv1hME4ZgM.png?width=1402&height=1122" },
  { title: "Aeromaan", type: "Interior Design", href: "/projects/aeromaan", image: "https://framerusercontent.com/images/oILmXaRN0G3wi00DnqAsQB4Y8HI.png?width=1000&height=800" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand-mark" href="/" aria-label="Jova Studio home">JOVA</a>
        <nav>
          <a href="#interior-design">Interior Design</a>
          <a href="#about">About</a>
          <a href="mailto:hello@jovastudio.co">Get in touch</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media"><img src="https://framerusercontent.com/images/KykF9C2WMNvCUI2xVTHx4TzPCC4.jpg?width=1355&height=1808" alt="Layered interior vignette with warm sculptural textures" /></div>
        <div className="hero-copy">
          <p className="eyebrow">Mixed-media art and interiors</p>
          <h1 id="hero-title">Jova Studio</h1>
          <p>Founded by Vanessa Jova, Jova Studio blends the nostalgic with the futuristic, respecting timeless designs of the past with a subtle twist of the avant garde.</p>
        </div>
      </section>

      <section className="intro-band" aria-label="Studio statement"><p>The best design weaves a story about the people who inhabit it.</p></section>

      <section className="projects-section" id="interior-design">
        <div className="section-heading"><p className="eyebrow">Selected work</p><h2>Interior Design</h2></div>
        <div className="project-grid">
          {projects.map((project) => (
            <a className="project-card" href={project.href} key={project.title}>
              <span className="project-image"><img src={project.image} alt={`${project.title} project`} /></span>
              <span className="project-meta"><strong>{project.title}</strong><span>{project.type}</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-image"><img src="https://framerusercontent.com/images/fuVhJwJgpC7I91qOakJ7hM41DRo.jpeg?width=1626&height=2295" alt="Curated room detail with expressive material palette" /></div>
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2>Storytelling, texture, soul.</h2>
          <p>A sense of storytelling is woven throughout her interior design spaces and curated experiences with a strong ethos of only using design elements rich in depth and originality.</p>
          <p>Her work is inspired by the patterns, textures, colors, and joy that emanate from her global travels, with much of her design procurement hailing from all over the world.</p>
          <p>Jova Studio is currently based in Mexico City and Ibiza, with completed projects in Los Angeles, Tepotzlan, San Miguel de Allende, Polanco, Condesa, Toluca, and San Lorenzo.</p>
        </div>
      </section>

      <section className="contact-section" aria-label="Contact"><div><p className="eyebrow">Inspiring design</p><h2>With art vision</h2></div><a className="contact-button" href="mailto:hello@jovastudio.co">Get in touch</a></section>
      <footer><span>Jova Studio</span><span>Mexico City / Ibiza</span></footer>
    </main>
  );
}
