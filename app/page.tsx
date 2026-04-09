"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Group } from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";

// Mobile navigation drawer
function MobileNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "#problem", label: "The Problem" },
    { href: "#transformation", label: "Your Path" },
    { href: "#proof", label: "Proof" },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden relative z-50 flex items-center justify-center w-11 h-11 rounded-lg"
        style={{ backgroundColor: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.3)" }}
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: "#D4AF37" }} />
          <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: "#D4AF37" }} />
          <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: "#D4AF37" }} />
        </div>
      </button>

      {/* Animated drawer overlay + panel */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
                onClick={close}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 z-[999] w-[280px] flex flex-col"
                style={{ backgroundColor: "#000000", borderLeft: "1px solid rgba(212, 175, 55, 0.25)", boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.8)" }}
              >
                {/* Close button */}
                <div className="flex justify-end p-4">
                  <button
                    aria-label="Close menu"
                    onClick={close}
                    className="flex items-center justify-center w-11 h-11 rounded-lg"
                    style={{ backgroundColor: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.3)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-2 px-6 mt-4">
                  {links.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.06 }}
                      className="flex items-center min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors"
                      style={{ color: "#B3B3B3" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#F5D76E";
                        e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#B3B3B3";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* CTA at bottom of drawer */}
                <div className="mt-auto p-6">
                  <motion.a
                    href="#cta"
                    onClick={close}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="btn-primary-xl w-full text-center"
                  >
                    Join Now
                  </motion.a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// Countdown timer component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-04-10T20:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl p-4 md:p-8 mb-6 md:mb-12 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.9)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      }}
    >
      <p className="text-center font-bold text-sm md:text-lg mb-3 md:mb-6" style={{ color: "#F5D76E" }}>Program Starts In:</p>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Mins" },
          { value: timeLeft.seconds, label: "Secs" },
        ].map((item, idx) => (
          <div key={idx} className="text-center p-2 md:p-4 rounded-2xl" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <motion.div
              className="text-fluid-h3 font-black"
              style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {String(item.value).padStart(2, "0")}
            </motion.div>
            <p className="text-[10px] md:text-xs uppercase mt-2 font-bold" style={{ color: "#B3B3B3" }}>{item.label}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-lg md:text-xl font-bold mt-6 tracking-wide" style={{ color: "#E5E5E5" }}>10 April, 8:00 PM IST</p>
    </motion.div>
  );
}

// Animated text reveal component
function AnimatedTextReveal({ text, className }: { text: string; className: string }) {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.12,
            type: "spring",
            damping: 12,
            stiffness: 100
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Interactive comparison slider - PREMIUM REDESIGN
function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(8);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => handleDrag(e.clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleDrag(e.touches[0].clientX);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden cursor-ew-resize select-none group min-h-[400px] md:min-h-[600px]"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        backgroundColor: "#000000",
        border: "1px solid #1A1A1A",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)"
      }}
    >
      {/* BASE LAYER: LEFT SIDE (TRAPPED) ALWAYS VISIBLE */}
      <div className="absolute inset-0 w-full h-full bg-[#000000]">
        <Image src="/trapped.png" alt="Trapped" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover grayscale-[70%]" priority />
        <div className="absolute inset-0 z-0 bg-[rgba(0,0,0,0.35)]" />
        {/* Subtle glow / fade on base layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-0 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-start justify-end md:justify-center p-[16px] md:p-[32px] md:pl-16 z-10 w-full md:w-[45%]">
          <div className="w-full max-w-[380px] bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <h3 className="text-fluid-h2 font-bold tracking-tight mb-3 md:mb-6 text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              TRAPPED
            </h3>
            <ul className="space-y-3 md:space-y-5 text-fluid-p text-white/90 flex flex-col">
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">⏰</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Trading time for money</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">💼</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Someone else&apos;s vision</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">📊</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>One paycheck away</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">😰</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Constant pressure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* TOP LAYER: RIGHT SIDE (FREE) CLIPPED BY SLIDER */}
      <div
        className="absolute inset-0 w-full h-full z-20 pointer-events-none bg-[#0a0a0a]"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image src="/free.png" alt="Free" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover sepia-[15%]" priority />
        <div className="absolute inset-0 z-0 bg-[#d4af37] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-black/25" />
        {/* Adds blur/fade at the clipping edge */}
        <div
          className="absolute inset-y-0 w-24 z-0 pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.6) 50%, transparent)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/25 to-transparent z-0 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-end justify-end md:justify-center p-[16px] md:p-[32px] md:pr-16 z-10 w-full pointer-events-none">
          <div className="w-full max-w-[380px] bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(212,175,55,0.1)]">
            <h3 className="text-fluid-h2 font-bold tracking-tight mb-3 md:mb-6" style={{ color: "#D4AF37", textShadow: "0 0 20px rgba(212, 175, 55, 0.5), 0 2px 8px rgba(0,0,0,0.5)" }}>
              FREE
            </h3>
            <ul className="space-y-3 md:space-y-5 text-fluid-p text-white flex flex-col">
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">🚀</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Multiple income streams</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">💡</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Your own authority</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">💰</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Scalable wealth</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">😌</span>
                <span className="leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>True freedom</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* DRAGGABLE VERTICAL HANDLE & GOLDEN DIVIDER */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] z-30 flex items-center justify-center pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          background: "linear-gradient(180deg, transparent 0%, #D4AF37 50%, transparent 100%)",
          boxShadow: "0 0 15px rgba(212, 175, 55, 1), 0 0 30px rgba(212, 175, 55, 0.5)",
        }}
      >
        <div
          className="absolute transform w-14 h-14 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 pointer-events-none"
          style={{
            backgroundColor: "#0A0A0A",
            border: "2px solid #D4AF37",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.8), inset 0 0 10px rgba(212, 175, 55, 0.3)",
          }}
        >
          <svg className="w-6 h-6 flex-shrink-0" fill="#D4AF37" viewBox="0 0 24 24">
            <path d="M8 5v14l-6-7 6-7zM16 5v14l6-7-6-7z" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Rotating dramatic background
function DramaticBackground() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[3.5, 64, 64]} position={[-4, 2, -3]}>
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.1}
          roughness={0.8}
          emissive="#0A0A0A"
          emissiveIntensity={0.8}
        />
      </Sphere>
      <Sphere args={[2.2, 64, 64]} position={[3.5, -2, -2]}>
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.2}
          roughness={0.7}
          emissive="#D4AF37"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </group>
  );
}

const painPoints = [
  { icon: "⏰", title: "WASTED TIME", desc: "2 hours lost in traffic daily" },
  { icon: "📧", title: "BURNOUT EMAILS", desc: "Work bleeds into dinner time" },
  { icon: "😰", title: "CONSTANT ANXIETY", desc: "One layoff away from crisis" },
  { icon: "💔", title: "MISSING LIFE", desc: "Your kids grow up around a laptop" },
  { icon: "🔄", title: "ENDLESS CYCLE", desc: "40 years of the same paycheck" },
  { icon: "😕", title: "NO CONTROL", desc: "Someone else decides your value" },
];

const successStats = [
  { number: "1,247+", label: "Professionals Transformed" },
  { number: "₹1Cr+", label: "Combined Income Generated" },
  { number: "47%", label: "Left Corporate Within 6 Months" },
];

const testimonials2 = [
  {
    quote: "I was 15 years deep in IT. Now I have 3 clients paying ₹50k+ monthly while still employed.",
    author: "Rajesh K.",
    role: "IT Leader, Bangalore"
  },
  {
    quote: "The framework showed me my expertise was worth ₹5L+ annually. I launched my consulting offer.",
    author: "Priya M.",
    role: "Finance Manager, Mumbai"
  },
  {
    quote: "Built an AI-powered product that runs on autopilot. Changed my entire trajectory.",
    author: "Amit P.",
    role: "Operations Head, Pune"
  },
  {
    quote: "15 years of experience finally feel like MY asset, not the company's.",
    author: "Deepak S.",
    role: "HR Director, Gurgaon"
  },
];

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Dramatic 3D Background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} />
          <Stars radius={150} depth={50} count={5000} factor={5} saturation={0.5} fade speed={1} />
          <DramaticBackground />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ backgroundColor: "rgba(0, 0, 0, 0.95)", borderColor: "rgba(212, 175, 55, 0.2)" }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-10 md:py-4">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/shobhit-logo.png"
              alt="Shobhit - The Transformer"
              width={140}
              height={50}
              priority
              style={{ height: "auto", maxHeight: "42px", width: "auto" }}
            />
          </motion.div>

          {/* Desktop nav — hidden on mobile */}
          <ul className="hidden md:flex gap-8 text-sm items-center" style={{ color: "#B3B3B3" }}>
            <li><a href="#problem" className="transition inline-flex items-center justify-center min-h-[44px] min-w-[44px]" style={{ color: "#B3B3B3" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#F5D76E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#B3B3B3")}>The Problem</a></li>
            <li><a href="#transformation" className="transition inline-flex items-center justify-center min-h-[44px] min-w-[44px]" style={{ color: "#B3B3B3" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#F5D76E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#B3B3B3")}>Your Path</a></li>
            <li><a href="#proof" className="transition inline-flex items-center justify-center min-h-[44px] min-w-[44px]" style={{ color: "#B3B3B3" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#F5D76E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#B3B3B3")}>Proof</a></li>
            <li><a href="#cta" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border px-5 py-2 transition" style={{ borderColor: "#D4AF37", color: "#B3B3B3" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F5D76E"; e.currentTarget.style.color = "#FFFFFF"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D4AF37"; e.currentTarget.style.color = "#B3B3B3"; }}>Join Now</a></li>
          </ul>

          {/* Mobile hamburger + drawer */}
          <MobileNav />
        </nav>
      </header>

      {/* HERO SECTION - EMOTIONAL, DRAMATIC */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-40 flex items-center min-h-[85vh] md:min-h-screen">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-none">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          {/* Gold tint for premium feel */}
          <div className="absolute inset-0 bg-[#D4AF37] opacity-[0.03] mix-blend-overlay" />
          {/* Bottom fade to black for smooth section transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
        <motion.div className="relative z-10 w-full">
          {/* Top accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4 md:mb-8"
          >
            <div className="h-1 w-12" style={{ background: "linear-gradient(90deg, #D4AF37, #F5D76E)" }}></div>
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "#F5D76E" }}>The awakening begins</span>
          </motion.div>

          {/* Main headline with word-by-word reveal */}
          <motion.div className="mb-6 md:mb-10">
            <AnimatedTextReveal
              text="From Corporate Burnout To Your Own ₹1+ Crore Consulting Business"
              className="text-fluid-h1 font-black leading-tight text-white"
            />
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-fluid-p max-w-3xl leading-relaxed mb-8 md:mb-12"
            style={{ color: "#B3B3B3" }}
          >
            A structured, proven system to escape corporate burnout and build
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> multiple income streams </span>
            in just 21 days — without leaving your job early.
          </motion.p>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 md:gap-6 mb-8 md:mb-16"
          >
            <a href="https://learn.transformershub.in/l/502f6ef596" className="btn-primary-xl">
              Reserve Your Seat
            </a>
          </motion.div>

          {/* Stats info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap gap-4 md:gap-8 text-sm"
          >
            <div className="border-l pl-4" style={{ borderColor: "#D4AF37" }}>
              <p className="font-bold text-2xl" style={{ color: "#F5D76E" }}>1,247+</p>
              <p style={{ color: "#6B7280" }}>Lives Changed</p>
            </div>
            <div className="border-l pl-4" style={{ borderColor: "#D4AF37" }}>
              <p className="font-bold text-2xl" style={{ color: "#F5D76E" }}>21 Days</p>
              <p style={{ color: "#6B7280" }}>To Your First Offer</p>
            </div>
            <div className="border-l pl-4" style={{ borderColor: "#D4AF37" }}>
              <p className="font-bold text-2xl" style={{ color: "#F5D76E" }}>10 April, 8:00 PM</p>
              <p style={{ color: "#6B7280" }}>Daily Live Sessions</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION - DARK, RELATABLE, UNCOMFORTABLE */}
      <section id="problem" className="relative mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-fluid-h1 font-black mb-6" style={{ color: "#FFFFFF" }}>
            Does This Hit Close?
          </h2>
          <p className="text-fluid-p max-w-2xl mx-auto" style={{ color: "#B3B3B3" }}>
            You built a world-class career. But somewhere along the way, your dream became someone else&apos;s asset.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative rounded-xl p-5 md:p-8 transition-all duration-300"
              style={{ backgroundColor: "rgba(10, 10, 10, 0.6)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#F5D76E" }}>{item.title}</h3>
                <p style={{ color: "#B3B3B3" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dark truth statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 md:mt-20 rounded-3xl p-8 md:p-12 text-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.7)", border: "1px solid rgba(212, 175, 55, 0.3)", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)" }}
        >
          <h3 className="text-fluid-h2 font-bold mb-4" style={{ color: "#FFFFFF" }}>
            The Hard Truth
          </h3>
          <p className="text-fluid-p max-w-2xl mx-auto" style={{ color: "#B3B3B3" }}>
            Your expertise isn&apos;t your asset — <span style={{ color: "#F5D76E", fontWeight: "bold" }}>the company&apos;s payroll is.</span> You stop working, you stop earning. That&apos;s not wealth. That&apos;s a beautiful cage.
          </p>
        </motion.div>
      </section>

      {/* INTERACTIVE COMPARISON - BEFORE vs AFTER */}
      <section id="transformation" className="relative mx-auto max-w-6xl px-4 py-16 md:px-10 md:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-fluid-h1 font-black mb-4" style={{ color: "#FFFFFF" }}>
            Your Transformation Awaits
          </h2>
          <p className="text-fluid-p" style={{ color: "#B3B3B3" }}>
            Drag the slider. See the shift. This is your future.
          </p>
        </motion.div>

        <ComparisonSlider />

        {/* Path to freedom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 rounded-2xl p-6 md:p-12"
          style={{ backgroundColor: "rgba(17, 17, 17, 0.7)", border: "1px solid #D4AF37" }}
        >
          <h3 className="text-fluid-h2 font-bold mb-8 text-center" style={{ color: "#FFFFFF" }}>
            Your Path to Freedom
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "EXPERTISE", desc: "Identify your 10+ years of skills" },
              { step: "2", title: "CONSULTING", desc: "Launch your first paid offer" },
              { step: "3", title: "SCALE", desc: "Build with AI products & leverage" },
              { step: "4", title: "FREEDOM", desc: "Reach ₹1 Crore+ in income" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold mb-4" style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#000000" }}>
                  {item.step}
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#FFFFFF" }}>{item.title}</h4>
                <p className="text-sm" style={{ color: "#B3B3B3" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROOF / RESULTS SECTION */}
      <section id="proof" className="relative mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-32">
        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mb-12 md:mb-20"
        >
          {successStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="rounded-2xl p-6 md:p-12 text-center backdrop-blur-sm"
              style={{ backgroundColor: "rgba(10, 10, 10, 0.7)", border: "1px solid rgba(212, 175, 55, 0.3)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)" }}
            >
              <motion.div
                className="text-fluid-h2 font-black mb-4"
                style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.8 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-fluid-p md:mt-2" style={{ color: "#B3B3B3" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-fluid-h1 font-black mb-6 md:mb-12 text-center" style={{ color: "#FFFFFF" }}>
            Real Transformations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {testimonials2.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative rounded-xl p-5 md:p-8 transition-all duration-300 backdrop-blur-sm"
                style={{ backgroundColor: "rgba(10, 10, 10, 0.6)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
              >
                <div className="flex gap-4 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#F5D76E" }}>★</span>
                  ))}
                </div>
                <p className="text-fluid-p mb-6 italic" style={{ color: "#FFFFFF" }}>&quot;{t.quote}&quot;</p>
                <div>
                  <p className="font-bold" style={{ color: "#F5D76E" }}>{t.author}</p>
                  <p className="text-sm" style={{ color: "#B3B3B3" }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MENTOR SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-8 md:gap-10 lg:grid-cols-2 items-center"
        >
          {/* Mentor info - Premium Dark Card (Left Column) */}
          <div 
            className="flex flex-col justify-center rounded-[32px] p-8 md:p-10 lg:p-12 h-full relative overflow-hidden backdrop-blur-md"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.6)", border: "1px solid rgba(212, 175, 55, 0.2)", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)" }}
          >
            {/* Subtle glow effect inside card */}
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: "rgba(212, 175, 55, 0.08)" }}></div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-10"
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: "rgba(212, 175, 55, 0.08)", border: "1px solid rgba(212, 175, 55, 0.3)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5D76E", boxShadow: "0 0 10px #F5D76E" }}></div>
                <p className="font-bold text-xs tracking-[0.15em] uppercase" style={{ color: "#F5D76E" }}>Your Guide</p>
              </div>
              
              <h2 className="text-fluid-h1 font-black mb-4 leading-[1.1]" style={{ color: "#FFFFFF", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                Meet Shobhit<br />Singhal
              </h2>
              
              <p className="text-lg md:text-xl font-medium mb-6 md:mb-8" style={{ color: "#D4AF37" }}>
                2x TEDx Circle Leader • Consulting Mentor
              </p>
              
              <p className="text-sm md:text-base mb-10 leading-relaxed max-w-[95%]" style={{ color: "#B3B3B3" }}>
                With 7+ years in corporate and 10+ years of mentoring, Shobhit has helped 100+ professionals build consulting buisness worth ₹1 Crore+ . He&apos;s lived this transformation — and now shows you the exact system.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-5 mt-auto">
                <div className="rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1" style={{ backgroundColor: "rgba(212, 175, 55, 0.03)", border: "1px solid rgba(212, 175, 55, 0.15)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-black mb-1" 
                    style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                  >
                    7+
                  </motion.div>
                  <p className="text-[10px] md:text-[11px] uppercase mt-2 tracking-widest font-semibold" style={{ color: "#808080" }}>Corporate Years</p>
                </div>
                
                <div className="rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1" style={{ backgroundColor: "rgba(212, 175, 55, 0.03)", border: "1px solid rgba(212, 175, 55, 0.15)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-black mb-1" 
                    style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                  >
                    100+
                  </motion.div>
                  <p className="text-[10px] md:text-[11px] uppercase mt-2 tracking-widest font-semibold" style={{ color: "#808080" }}>Mentored</p>
                </div>
                
                <div className="rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-center" style={{ backgroundColor: "rgba(212, 175, 55, 0.03)", border: "1px solid rgba(212, 175, 55, 0.15)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-black mb-1" 
                    style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                  >
                    3
                  </motion.div>
                  <p className="text-[10px] md:text-[11px] uppercase mt-2 tracking-widest font-semibold leading-tight mx-auto max-w-[80px]" style={{ color: "#808080" }}>Consulting Programs</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mentor Images - Symmetrical Stack (Right Column) */}
          <div className="flex flex-col items-center justify-center w-full mt-4 md:mt-0 lg:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col w-full max-w-[480px] gap-6"
            >
              
              {/* Main Mentor Image (Top) */}
              <div className="relative w-full rounded-[24px] overflow-hidden aspect-[4/3] backdrop-blur-sm group" style={{ backgroundColor: "rgba(10, 10, 10, 0.5)", border: "1px solid rgba(212, 175, 55, 0.4)", boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                <Image
                  src="/mentor.png"
                  alt="Shobhit Singhal"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>

              {/* Bottom Authority Images - Symmetrical Squares */}
              <div className="grid grid-cols-2 gap-6 w-full">
                
                {/* Recognition */}
                <div className="group flex flex-col w-full">
                  <div className="relative w-full rounded-[24px] overflow-hidden aspect-square backdrop-blur-sm" style={{ backgroundColor: "rgba(10, 10, 10, 0.4)", border: "1px solid rgba(212, 175, 55, 0.15)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
                    <Image 
                      src="/recognition.png" 
                      alt="Recognition" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[15%]" 
                      sizes="(max-width: 768px) 50vw, 220px" 
                    />
                  </div>
                  <p className="text-center text-[10px] md:text-xs mt-4 text-[#B3B3B3] uppercase tracking-[0.15em] font-bold transition-colors duration-300 group-hover:text-[#F5D76E]">Recognition</p>
                </div>

                {/* Industry Presence */}
                <div className="group flex flex-col w-full">
                  <div className="relative w-full rounded-[24px] overflow-hidden aspect-square backdrop-blur-sm" style={{ backgroundColor: "rgba(10, 10, 10, 0.4)", border: "1px solid rgba(212, 175, 55, 0.15)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
                    <Image 
                      src="/industryrecognition.png" 
                      alt="Industry presence" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[15%]" 
                      sizes="(max-width: 768px) 50vw, 220px" 
                    />
                  </div>
                  <p className="text-center text-[10px] md:text-xs mt-4 text-[#B3B3B3] uppercase tracking-[0.15em] font-bold transition-colors duration-300 group-hover:text-[#F5D76E]">Industry presence</p>
                </div>
                
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION - FINAL PUSH */}
      <section id="cta" className="relative mx-auto max-w-5xl px-4 py-16 md:px-10 md:py-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-8 md:p-16 text-center relative overflow-hidden backdrop-blur-md"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.9)", border: "1px solid rgba(212, 175, 55, 0.3)", boxShadow: "0 25px 50px rgba(212, 175, 55, 0.15), 0 25px 80px rgba(0, 0, 0, 0.4)" }}
        >
          {/* Background glow effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: "rgba(212, 175, 55, 0.15)" }}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: "rgba(245, 215, 110, 0.1)" }}></div>

          <motion.div className="relative z-10">
            <h2 className="text-fluid-h1 font-black mb-6" style={{ color: "#FFFFFF" }}>
              Ready to Reclaim Your Freedom?
            </h2>
            <p className="text-fluid-p mb-8 md:mb-12 max-w-2xl mx-auto" style={{ color: "#B3B3B3" }}>
              The Corporate Freedom Series starts <span style={{ color: "#F5D76E", fontWeight: "bold" }}>10 April, 8:00 PM</span>.
              21 days of live guidance. Proven system. Real results.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
              <a href="https://learn.transformershub.in/l/502f6ef596" className="btn-primary-xl">
                Reserve Your Seat Now
              </a>
            </div>

            <p className="text-sm italic" style={{ color: "#B3B3B3" }}>
              Limited seats for live participation. Early bird pricing ends soon.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12 px-4 md:px-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.95)", borderColor: "rgba(212, 175, 55, 0.2)" }}>
        <div className="max-w-7xl mx-auto text-center text-sm" style={{ color: "#B3B3B3" }}>
          <p>© 2026 Corporate Freedom Series • Built for Transformation</p>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --bg-primary: #000000 !important;
          --bg-secondary: #0A0A0A !important;
          --accent-primary: #D4AF37 !important;
          --accent-cyan: #F5D76E !important;
          --text-primary: #FFFFFF !important;
          --text-secondary: #B3B3B3 !important;
          --text-muted: #808080 !important;
          --border: #1A1A1A !important;
        }

        * {
          color-scheme: dark !important;
        }

        html {
          scroll-behavior: smooth !important;
          background-color: var(--bg-primary) !important;
        }

        body {
          background-color: var(--bg-primary) !important;
          color: var(--text-primary) !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif !important;
        }

        a {
          color: var(--text-secondary) !important;
          text-decoration: none !important;
          transition: color 0.3s ease !important;
        }

        a:hover {
          color: var(--accent-cyan) !important;
        }

        .btn-primary-xl {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 12px !important;
          padding: 1.25rem 3rem !important;
          font-size: 1.1rem !important;
          font-weight: 700 !important;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%) !important;
          color: var(--bg-primary) !important;
          text-decoration: none !important;
          border: none !important;
          box-shadow: 0 20px 50px rgba(212, 175, 55, 0.3) !important;
          transition: all 0.3s ease !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          cursor: pointer !important;
          position: relative !important;
          overflow: hidden !important;
        }
        
        .btn-primary-xl::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: -100% !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-primary) 100%) !important;
          transition: left 0.3s ease !important;
          z-index: -1 !important;
        }

        .btn-primary-xl:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 30px 80px rgba(212, 175, 55, 0.5) !important;
        }

        .btn-secondary-xl {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 12px !important;
          padding: 1.25rem 3rem !important;
          font-size: 1.1rem !important;
          font-weight: 700 !important;
          background: rgba(212, 175, 55, 0.15) !important;
          color: var(--accent-cyan) !important;
          border: 1.5px solid var(--accent-primary) !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          cursor: pointer !important;
        }
        
        .btn-secondary-xl:hover {
          transform: translateY(-4px) !important;
          border-color: var(--accent-cyan) !important;
          background: rgba(212, 175, 55, 0.25) !important;
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.25) !important;
        }

        .btn-outline-xl {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 12px !important;
          padding: 1.25rem 3rem !important;
          font-size: 1.1rem !important;
          font-weight: 700 !important;
          background: transparent !important;
          color: var(--accent-cyan) !important;
          border: 1.5px solid var(--accent-cyan) !important;
          cursor: pointer !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }
        
        .btn-outline-xl:hover {
          transform: translateY(-4px) !important;
          border-color: white !important;
          background: rgba(245, 215, 110, 0.1) !important;
          box-shadow: 0 15px 40px rgba(245, 215, 110, 0.2) !important;
        }
      `}</style>
    </motion.main>
  );
}
