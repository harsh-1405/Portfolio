/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Wrench, 
  Users, 
  Trophy, 
  ExternalLink,
  ChevronRight,
  Briefcase,
  ArrowUp,
  Send,
  Cpu,
  Zap,
  Star
} from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import Typed from 'typed.js';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import * as THREE from 'three';

// --- Three.js Background Component ---
const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1500;
    const posArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00f2ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      starsMesh.rotation.y += 0.001;
      starsMesh.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} id="bg-canvas" />;
};

// --- Main App Component ---
const App = () => {
  const typedRef = useRef(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dotRef.current, {
        x: e.clientX - 2,
        y: e.clientY - 2,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Typing Effect
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Computer Engineering Student',
        'Full Stack Developer',
        'Event Coordinator',
        'Tech Enthusiast'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 1500
    });

    return () => typed.destroy();
  }, []);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const personalInfo = {
    name: "Harsh Srivastava",
    phone: "9870054770",
    email: "harshh1420@gmail.com",
    location: "Surat, Gujarat",
    linkedin: "https://www.linkedin.com/in/harshsrivastava-",
    github: "https://github.com/harshh1420-lab"
  };

  const education = [
    {
      title: "B.Tech Computer Engineering",
      institution: "Chhotubhai Gopalbhai Patel Institute of Technology, Maliba Campus",
      university: "Uka Tarsadia University, Bardoli",
      period: "2023 – 2027",
      icon: <GraduationCap />
    },
    {
      title: "Class 12",
      institution: "Gurukul Vidhyapith English Medium School",
      location: "Katargam, Surat",
      period: "Completed",
      icon: <Star />
    },
    {
      title: "Class 10",
      institution: "Gajera English Medium School",
      location: "Katargam, Surat",
      period: "Completed",
      icon: <Star />
    }
  ];

  const skills = [
    { category: "Programming", items: ["C", "C++", "Python"], icon: <Code2 /> },
    { category: "Tools", items: ["GitHub", "Canva"], icon: <Wrench /> },
    { category: "Soft Skills", items: ["Teamwork", "Problem Solving", "Critical Thinking", "Event Management", "Adaptability"], icon: <Users /> }
  ];

  const achievements = [
    {
      title: "UTH Fest Leadership",
      desc: "Head Coordinator for 2 consecutive years, managing large teams and college-level events.",
      icon: <Trophy className="text-yellow-400" />
    },
    {
      title: "3rd Position",
      desc: "Achieved 3rd position in UTH Fest under leadership and strategic coordination.",
      icon: <Zap className="text-cyan-400" />
    },
    {
      title: "Leadership Recognition",
      desc: "Recognized for exceptional leadership, coordination, and execution skills.",
      icon: <Cpu className="text-purple-400" />
    }
  ];

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />

      {/* Background */}
      <ThreeBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            <span className="neon-text">HARSH.</span>
          </motion.div>
          <div className="hidden md:flex space-x-10 text-sm font-medium tracking-widest uppercase">
            {['About', 'Education', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-400 font-mono tracking-[0.5em] mb-6 uppercase text-sm">Welcome to my universe</h2>
            <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter leading-none">
              {personalInfo.name}
            </h1>
            <div className="text-2xl md:text-4xl font-light text-slate-400 mb-12 h-12">
              <span ref={typedRef}></span>
            </div>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light italic">
              "Building tech solutions with leadership and creativity"
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                View Projects
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-10 py-4 border border-white/20 rounded-full font-bold hover:border-cyan-400 transition-all duration-300 backdrop-blur-md"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-full">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-20 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
            <h3 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">About Me</h3>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
              Motivated Computer Engineering student with a strong foundation in programming and a passion for leadership. 
              Proven experience as an Event Coordinator, managing teams and executing large-scale events. 
              Skilled in C++, Python, and web development, with practical project experience. 
              Seeking internship opportunities to contribute, learn, and grow in a dynamic environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-full bg-black/40">
        <div className="max-w-7xl mx-auto w-full">
          <h3 className="text-5xl font-bold mb-20 text-center tracking-tighter">Education Timeline</h3>
          <div className="grid gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500}>
                  <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-cyan-500/50 transition-all duration-500">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                      {edu.icon}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-2xl font-bold mb-2">{edu.title}</h4>
                      <p className="text-slate-300 mb-1">{edu.institution}</p>
                      {edu.university && <p className="text-slate-500 text-sm uppercase tracking-widest">{edu.university}</p>}
                      {edu.location && <p className="text-slate-500 text-sm">{edu.location}</p>}
                    </div>
                    <div className="text-cyan-400 font-mono text-xl">{edu.period}</div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-full">
        <div className="max-w-7xl mx-auto w-full">
          <h3 className="text-5xl font-bold mb-20 text-center tracking-tighter">Technical Arsenal</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} className="h-full">
                  <div className="glass-card p-10 h-full flex flex-col items-center text-center group hover:shadow-[0_0_30px_rgba(0,242,255,0.1)] transition-all">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-6 tracking-tight">{skill.category}</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      {skill.items.map(item => (
                        <span key={item} className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium border border-white/10 group-hover:border-cyan-500/30 transition-all">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-full bg-black/40">
        <div className="max-w-5xl mx-auto w-full">
          <h3 className="text-5xl font-bold mb-20 text-center tracking-tighter">Featured Works</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="glass-card p-12 md:p-20 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                    <Github size={32} />
                  </a>
                </div>
                <h4 className="text-4xl font-bold mb-6 tracking-tight">Attendance Management System</h4>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                  A comprehensive system designed to track and manage student attendance efficiently. 
                  Leveraging programming logic and structured data to provide real-time insights and automated reporting.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  {['Python', 'MySQL', 'Data Management'].map(tag => (
                    <span key={tag} className="px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 text-white font-bold group-hover:text-cyan-400 transition-colors"
                >
                  <span>Explore on GitHub</span>
                  <ExternalLink size={20} />
                </a>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-full">
        <div className="max-w-7xl mx-auto w-full">
          <h3 className="text-5xl font-bold mb-20 text-center tracking-tighter">Milestones</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-10 relative group"
              >
                <div className="mb-8">{item.icon}</div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h4>
                <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-cyan-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-full bg-black/40">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-6xl font-bold mb-10 tracking-tighter">Let's build <br /> <span className="neon-text">something great.</span></h3>
              <p className="text-xl text-slate-400 mb-12 font-light">
                Currently seeking internship opportunities to contribute and grow. 
                Whether you have a question or just want to say hi, my inbox is always open.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-xl font-bold hover:text-cyan-400 transition-colors">{personalInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Call Me</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-xl font-bold hover:text-purple-400 transition-colors">{personalInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xl font-bold">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 md:p-16">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-500 ml-1">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border-b border-white/10 px-4 py-4 focus:border-cyan-400 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-500 ml-1">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border-b border-white/10 px-4 py-4 focus:border-cyan-400 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-500 ml-1">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border-b border-white/10 px-4 py-4 focus:border-cyan-400 outline-none transition-all resize-none" placeholder="Let's talk about..." />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center space-x-3"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tighter mb-2 neon-text">HARSH SRIVASTAVA</h2>
            <p className="text-slate-500 text-sm font-light">Building the future, one line at a time.</p>
          </div>
          <div className="flex space-x-8">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-cyan-500 hover:text-black transition-all">
              <Github size={24} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-blue-500 hover:text-black transition-all">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-slate-600 text-sm">© 2026 Harsh Srivastava. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-16 h-16 bg-white text-black rounded-full shadow-2xl z-[100] flex items-center justify-center hover:bg-cyan-400 transition-all"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
