import { useState, useEffect, useRef } from 'react';
import {
  Code2, Terminal, Globe, Github, Linkedin, Mail,
  ChevronDown, Menu, X, Layers, Database,
  Smartphone, Braces, GitBranch, Star, ArrowRight, Download,
  Zap, Shield, Users,
} from 'lucide-react';
import MatrixCanvas from './MatrixCanvas';
import useTypewriter from './useTypewriter';
import falaParaImage from './img/Fala-para.jpg';
import moviesAndMusicImage from './img/movies-and-music.jpg';

const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
];

const SKILLS = [
  { name: 'JavaScript / TypeScript', level: 88, icon: <Braces size={16} /> },
  { name: 'React / Next.js', level: 85, icon: <Layers size={16} /> },
  { name: 'Node.js / APIs REST', level: 80, icon: <Terminal size={16} /> },
  { name: 'Python', level: 75, icon: <Code2 size={16} /> },
  { name: 'Banco de Dados SQL', level: 78, icon: <Database size={16} /> },
  { name: 'Git / DevOps', level: 82, icon: <GitBranch size={16} /> },
  { name: 'UI/UX & CSS', level: 86, icon: <Globe size={16} /> },
  { name: 'Mobile (React Native)', level: 70, icon: <Smartphone size={16} /> },
];

const PROJECTS = [
  {
    title: 'Fala Pará',
    description: 'Um dos meus primeiros projetos acadêmicos, o Fala Pará foi desenvolvido com o objetivo de ajudar peso-soas que viriam para o estado do Pará a se adaptarem à cultura e gírias da região.',
    tags: ['HTML', 'CSS', 'JS'],
    image: falaParaImage,
    link: 'https://falapara.netlify.app/',
    featured: true,
  },
  {
    title: 'Moves and Music',
    description: 'O Movies and Music foi meus primeiro projetos acadêmicos, desenvolvido para colocar em prática os conhecimentos adquiridos em HTML, CSS e JavaScript. O objetivo do projeto foi criar um site voltado para a apresentação de filmes e músicas, com foco em uma interface organizada, responsiva e de fácil navegação. Durante o desenvolvimento, trabalhei na estruturação das páginas, estilização da interface, manipulação de elementos com JavaScript e organização do código, consolidando minha base em desenvolvimento web.',
    tags: ['HTML', 'CSS', 'Javascript',],
    image: moviesAndMusicImage,
    link: 'https://moviesandmusic.netlify.app/',
    featured: false,
  },
];



function SkillBar({ name, level, icon, delay }: { name: string; level: number; icon: React.ReactNode; delay: number }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <span className="text-purple-400">{icon}</span>
          {name}
        </div>
        <span className="font-mono text-xs text-purple-400">{level}%</span>
      </div>
      <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-400 transition-all duration-1000 ease-out relative"
          style={{ width: animate ? `${level}%` : '0%' }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-purple-500/50" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-purple-900/30 bg-slate-900/50 hover-card transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-purple-600/80 text-xs font-mono text-white backdrop-blur-sm">
            <Star size={10} fill="currentColor" /> Destaque
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-white mb-2 font-mono group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/40">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 hover:text-white"
        >
          Ver projeto →
        </a>
      </div>

      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(168,85,247,0.3)' }} />
    </div>
    
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const typedText = useTypewriter({
    texts: [
      'Desenvolvedora Full Stack',
      'Analista de Sistemas',
      'Criadora de soluções',
    ],
    speed: 70,
    pause: 2500,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

      const sections = ['hero', 'sobre', 'habilidades', 'projetos', 'contato'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-slate-100 grain">
      <MatrixCanvas />
      <div className="scanline" />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur bg-black/60 border-b border-purple-900/20 py-3' : 'py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="font-mono font-bold text-lg flex items-center gap-2">
            <span className="text-purple-400">&lt;</span>
            <span className="glow-text text-white">EN</span>
            <span className="text-purple-400">/&gt;</span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-mono text-sm transition-colors relative group ${activeSection === link.href.slice(1) ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-purple-500 transition-all duration-300 ${activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              </li>
            ))}
          </ul>

          <a href="#contato" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-sm font-medium transition-colors">
            <Mail size={14} /> Contato
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-300">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden nav-blur bg-black/80 border-t border-purple-900/20 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="font-mono text-sm text-slate-300 hover:text-purple-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-950/20 via-transparent to-transparent" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(88,28,135,0.15) 0%, transparent 70%)' }} />
        <div className="spotlight" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-800/10 blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-violet-900/10 blur-3xl float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-700/40 bg-purple-950/30 text-purple-300 text-sm font-mono mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponível para projetos
          </div>

          <div className="mb-4 font-mono text-purple-500 text-sm tracking-widest uppercase">
            &gt; Olá, mundo! Meu nome é
          </div>

          <h1
            className="glitch font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-4 leading-none"
            data-text="Emily Nivea"
          >
            <span className="text-white">Emily </span>
            <span className="glow-text" style={{ color: '#a855f7' }}>Nivea</span>
          </h1>

          <div className="font-mono text-xl md:text-2xl text-slate-300 mb-6 h-8">
            <span className="text-purple-400">$</span> {typedText}
            <span className="cursor" />
          </div>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Transformo ideias em código limpo, escalável e funcional.
            Especialista em criar experiências digitais que fazem a diferença.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projetos"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-purple-700 hover:bg-purple-600 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-700/30">
              Ver Projetos
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#sobre"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-purple-700/40 hover:border-purple-500 text-slate-300 hover:text-white font-medium transition-all duration-300 backdrop-blur-sm">
              <Download size={16} /> Sobre mim
            </a>
          </div>

          <div className="flex items-center justify-center gap-5 mt-10">
            {[
              { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/sweetie-dev' },
              { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/emily-nivea-ribeiro-da-silva-235ba9403/' },
              { icon: <Mail size={18} />, label: 'Email', href: 'mailto:3mysiva@gmail.com' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-colors text-sm font-mono"
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        <a href="#sobre" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 hover:text-purple-400 transition-colors animate-bounce">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="relative py-24 hex-bg">
        <div className="neon-line mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-purple-500 text-sm mb-3">// sobre_mim.ts</div>
              <h2 className="font-display font-bold text-4xl text-white mb-6">
                Quem sou <span className="glow-text text-purple-400">eu?</span>
              </h2>

              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Oi! Sou <span className="text-white font-medium">Emily Nivea Ribeiro da Silva</span>, desenvolvedora
                  full stack apaixonada por criar soluções digitais e eficientes.
                </p>
                <p>
                  Minha jornada na tecnologia começou com curiosidade e hoje é minha maior paixão.
                  Adoro transformar problemas complexos em interfaces simples e código limpo.
                </p>
                <p>
                  Quando não estou codando, estou explorando novas tecnologias, contribuindo
                  para projetos open-source ou tomando café enquanto resolvo desafios de algoritmos.
                </p>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-purple-900/30 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-600 text-xs ml-2">emily.config.json</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div><span className="text-slate-500">{`{`}</span></div>
                  <div className="pl-4"><span className="text-purple-400">"nome"</span><span className="text-slate-500">: </span><span className="text-green-400">"Emily Nivea Ribeiro da Silva"</span><span className="text-slate-500">,</span></div>
                  <div className="pl-4"><span className="text-purple-400">"cargo"</span><span className="text-slate-500">: </span><span className="text-green-400">"Full Stack Developer"</span><span className="text-slate-500">,</span></div>
                  <div className="pl-4"><span className="text-purple-400">"localização"</span><span className="text-slate-500">: </span><span className="text-green-400">"Brasil"</span><span className="text-slate-500">,</span></div>
                  <div className="pl-4"><span className="text-purple-400">"disponível"</span><span className="text-slate-500">: </span><span className="text-cyan-400">true</span><span className="text-slate-500">,</span></div>
                  <div className="pl-4"><span className="text-purple-400">"foco"</span><span className="text-slate-500">: [</span><span className="text-yellow-400">"frontend"</span><span className="text-slate-500">, </span><span className="text-yellow-400">"backend"</span><span className="text-slate-500">, </span><span className="text-yellow-400">"devops"</ span>< span className="text-slate-500">]</ span ></ div >
                  <div >< span className="text-slate-500" >{`}`}</ span ></ div >
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="font-mono text-purple-500 text-sm mb-6">//interesses</div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-purple-900/20">
                <div className="flex flex-wrap gap-2">
                  {['Open Source', 'AI & ML','N8N', 'Cloud Computing', 'Segurança', 'Performance', 'UI/UX', 'DevOps', 'Algoritmos'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs bg-purple-950/60 text-purple-300 border border-purple-800/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section id="habilidades" className="relative py-24 bg-[#050508]">
        <div className="neon-line mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="font-mono text-purple-500 text-sm mb-3">// habilidades.map()</div>
            <h2 className="font-display font-bold text-4xl text-white">
              Minhas <span className="glow-text text-purple-400">Tecnologias</span>
            </h2>
          </div>

          <div className="reveal grid md:grid-cols-2 gap-6">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 100} />
            ))}
          </div>

          <div className="reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={24} />, label: 'Código Seguro', desc: 'Boas práticas e OWASP' },
              { icon: <Zap size={24} />, label: 'Alta Performance', desc: 'Otimização e escalabilidade' },
              { icon: <Users size={24} />, label: 'Trabalho em Time', desc: 'Metodologias ágeis' },
              { icon: <Star size={24} />, label: 'Clean Code', desc: 'Legibilidade e manutenção' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="p-5 rounded-xl bg-slate-900/50 border border-purple-900/20 text-center hover-card">
                <div className="inline-flex p-3 rounded-xl bg-purple-950/60 text-purple-400 mb-3">
                  {icon}
                </div>
                <div className="font-medium text-sm text-white mb-1">{label}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="relative py-24 hex-bg">
        <div className="neon-line mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="font-mono text-purple-500 text-sm mb-3">// projetos.filter(featured)</div>
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Meus <span className="glow-text text-purple-400">Projetos Acadêmicos</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Cada projeto é uma história de problema resolvido e tecnologia bem aplicada.
            </p>
          </div>

          <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="reveal text-center mt-12">
            <a
              href="https://github.com/sweetie-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 mx-auto px-6 py-3 rounded-xl border border-purple-700/40 hover:border-purple-500 text-slate-300 hover:text-white font-mono text-sm transition-all"
            >
              <Github size={16} /> Ver todos no GitHub
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative py-24 bg-[#050508]">
        <div className="neon-line mb-20" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <div className="font-mono text-purple-500 text-sm mb-3">// contato.send()</div>
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Vamos <span className="glow-text text-purple-400">Conversar?</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Tem um projeto incrível ou quer apenas trocar uma ideia? Minha caixa de entrada está sempre aberta.
            </p>
          </div>

          <div className="reveal grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/50 border border-purple-900/20 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-medium text-white text-sm mb-1">Email</div>
                  <div className="text-slate-400 text-sm font-mono">3mysiva@gmail.com</div>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/50 border border-purple-900/20 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="font-medium text-white text-sm mb-1">LinkedIn</div>
                  <div className="text-slate-400 text-sm font-mono">https://linkedin.com/in/emily-nivea-ribeiro-da-silva-235ba9403/</div>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/50 border border-purple-900/20 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400">
                  <Github size={18} />
                </div>
                <div>
                  <div className="font-medium text-white text-sm mb-1">GitHub</div>
                  <div className="text-slate-400 text-sm font-mono">https://github.com/sweetie-dev</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-purple-950/40 to-slate-900/60 border border-purple-800/20">
                <div className="font-mono text-xs text-purple-400 mb-3">// status_atual</div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Aberta para oportunidades
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Freelance, CLT ou projetos colaborativos. Vamos conversar!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-slate-400 mb-2">nome</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))}
                  className="contact-input w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-slate-400 mb-2">email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))}
                  className="contact-input w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-slate-400 mb-2">mensagem</label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))}
                  className="contact-input w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 resize-none"
                  placeholder="Conta tudo aqui..."
                />
              </div>

              {sent && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-950/40 border border-green-800/30 text-green-400 text-sm font-mono">
                  <span className="w-2 h-2 rounded-full bg-green-400" /> Mensagem enviada com sucesso!
                </div>
              )}

              <button type="submit"
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-700 hover:bg-purple-600 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-700/30">
                Enviar Mensagem
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-900/20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-slate-600">
            <span className="text-purple-500">&lt;</span>
            Emily Nivea
            <span className="text-purple-500">/&gt;</span>
            {' '}&copy; {new Date().getFullYear()}
          </div>
          <div className="font-mono text-xs text-slate-700">
            Feito com <span className="text-purple-500">{'<3'}</span> e muito café
          </div>
        </div>
      </footer>
    </div>
  );
}
