"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { Github, Linkedin, FileText, Mail } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function Home() {
  const projectsRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()

  // Add this function to handle scrolling to projects section
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a1128] text-white">
      {/* Animated stars background */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-stars">
        {/* Static stars from the background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/stars-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Additional animated stars - with reduced frequency */}
        {Array.from({ length: 100 }).map((_, i) => {
          // Create some larger stars for more visibility
          const isLargeStar = i % 10 === 0
          const size = isLargeStar ? 4 + Math.random() * 4 : 1 + Math.random() * 3

          // Only animate some stars (reduce frequency)
          const shouldAnimate = i % 3 === 0 // Only animate every 3rd star

          // Longer animation durations
          const animationDuration = 6 + Math.random() * 10 // 6-16 seconds per twinkle

          // More varied delays to prevent many stars twinkling at once
          const animationDelay = Math.random() * 15 // 0-15 second delays

          return (
            <div
              key={i}
              className={
                shouldAnimate
                  ? `absolute rounded-full bg-white animate-twinkle-${i % 5}`
                  : "absolute rounded-full bg-white"
              }
              style={{
                width: size + "px",
                height: size + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.5, // Higher base opacity
                ...(shouldAnimate && {
                  animationDelay: `${animationDelay}s`,
                  animationDuration: `${animationDuration}s`,
                }),
              }}
            />
          )
        })}
      </div>

      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">Hi, I'm Alysha.</h1>
              <p className="text-xl md:text-2xl mb-8 font-mono">
                A Software Engineering student, eager to grow and learn.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="font-mono relative overflow-hidden group bg-white text-black border-none hover:bg-white rounded-xl px-8 py-4 text-lg"
                  onClick={scrollToProjects}
                >
                  <span className="relative z-10 group-hover:text-black">View Projects</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>
            <div className="relative w-32 h-32 md:w-48 md:h-48 mr-8 md:mr-16">
              <div className="w-full h-full relative flex items-center justify-center">
                <Image
                  src="/images/character.gif"
                  alt="Animated pixel character"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                  style={{
                    imageRendering: "pixelated",
                    transform: "scale(2.5)",
                  }}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About/Skills section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-12">
            {/* Profile image - Fixed to be properly circular and centered */}
            <div className="relative w-64 h-64 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
              <Image
                src="/images/webProfile.jpg"
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-mono">Skillset</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillCard title="Web Development" level={90}>
                  React, Next.js, TypeScript, Tailwind CSS, Python, FastAPI, Flask, Vercel, REST APIs
                </SkillCard>
                <SkillCard title="Mobile Development" level={80}>
                  Flutter, Dart, Java/Kotlin, Android Studio
                </SkillCard>
                <SkillCard title="ML & AI" level={70}>
                  Tensorflow, LangChain, scikit-learn, NLTK
                </SkillCard>
                <SkillCard title="Data & Databases" level={75}>
                  Oracle, SQL, Firestore, Power BI
                </SkillCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section ref={projectsRef} className="relative px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 font-mono">Projects</h2>
          <Accordion type="single" collapsible className="w-full">
            <ProjectAccordionItem
              title="StudyCepat"
              technologies="Next.js, TypeScript, Tailwind CSS, Python"
              date="April 2025"
            >
              A website to upload lecture notes PDF, or to paste an article in text form to be transformed and
              summarised into flashcards with questions and answers.
            </ProjectAccordionItem>

            <ProjectAccordionItem
              title="ParkSyde"
              technologies="React, Node.js, NFC Programming"
              date="May 2025 - Ongoing"
            >
              Web app to ease your double parking. Helps car owners to be notified to move their cars that double parked
              by the blocked person tapping their phone on our NFC programmed car sticker.
            </ProjectAccordionItem>

            <ProjectAccordionItem title="Obsolescence Web Game" technologies="Godot Game Engine" date="December 2024">
              A simple simulation game of a desktop infected with virus, including mini games and a boss fight. Built
              for UM Game Jam 2025.
            </ProjectAccordionItem>

            <ProjectAccordionItem
              title="AILytics"
              technologies="Flutter, Tensorflow, Flask, Gemini API"
              date="April 2025"
            >
              Mobile app for users to upload raw business data and transform with AI into insights, 
              and predicted revenue, apart from suggested business strategies. Built for Kitahack 2025.
            </ProjectAccordionItem>

            <ProjectAccordionItem
              title="Backtester Betty Library"
              technologies="Python, Tensorflow"
              date="April 2025"
            >
              Backtesting library for quantitative trading that suggests the 
              best signal combinations using an XGBoost ML model with object-oriented modules. Built for UMHackathon 2025.
            </ProjectAccordionItem>

            <ProjectAccordionItem
              title="Recyler Website"
              technologies="HTML, CSS, Javascript, Flask"
              date="March 2025"
            >
              Website to upload images of recyclable items and classify their category. 
              Built to practice web development and Flask, apart from Firestore and JavaScript 
              functionalities to upload images from the device and generate a PDF.
            </ProjectAccordionItem>

             <ProjectAccordionItem
              title="HealthHub App"
              technologies="Java, Android Studio, Firebase"
              date="October 2024 = January 2025"
            >
              Group project for my Mobile Application Development course.
              An application to manage booking of doctor appointments, purchasing 
              pharmaceutical products, reading and saving medical articles.
            </ProjectAccordionItem>

            <ProjectAccordionItem
              title="Machine Learning Model to Predict Flooding in SEA countries"
              technologies="Python, scikit-learn, BeautifulSoup"
              date="May = July 2024"
            >
              Group project for my Machine Learning course.
              Involved webscraping for data acquisition for the training and testing 
              sample, and implemented 5 different ML models for prediction.
            </ProjectAccordionItem>

            <ProjectAccordionItem
              title="NBA General Manager App"
              technologies="Java, Swing UI, MySQL"
              date="March = July 2024"
            >
              Group project for my Data Structures course using Java programming language dan Swing UI.
              An application to manage basketball players in terms of buying players, 
              managing injuries and extending contracts. Implemented database using MySQL and exposure to GitHub usage for team development purposes.
            </ProjectAccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Education section */}
      <section className="relative px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 font-mono">Education</h2>
          <Accordion type="single" collapsible className="w-full">
            <EducationAccordionItem
              degree="Bachelor of Computer Science (Software Engineering)"
              institution="University of Malaya"
              years="2023 - Ongoing"
              logoSrc="/images/university-of-malaya-logo.png"
            >
              <ul className="list-disc pl-5 space-y-2 text-lg">
                <li>
                  Relevant coursework: Data Structures, Algorithms, Web Development, Database, Mobile App Development,
                  Software Modelling, Machine Learning
                </li>
                <li>Top 10 Finalist of Hackathon X UMPSA 2025</li>
                <li>Active member of Persatuan Komputer (PEKOM) Universiti Malaya</li>
              </ul>
            </EducationAccordionItem>

            <EducationAccordionItem
              degree="Full-Stack .NET Development Training"
              institution="Hanodale Solutions"
              years="May 2025 - Ongoing"
              logoSrc="/images/hanodale-logo.png"
            >
              <ul className="list-disc pl-5 space-y-2 text-lg">
                <li>Intensive 6 months program focused on full-stack development with .NET</li>
                <li>
                  Developed multiple projects for assessment including Budget Tracker, Mini Library and Employee Manager
                </li>
                <li>Fully sponsored by Hanodale Solutions and Talentcorp</li>
              </ul>
            </EducationAccordionItem>

            <EducationAccordionItem
              degree="Google Data Analytics Professional Certificate"
              institution="Google on Coursera"
              years="January 2025 - Ongoing"
              logoSrc="/images/google.png"
            >
              <ul className="list-disc pl-5 space-y-2 text-lg">
                <li>Fully sponsored by Females in Tech Malaysia.</li>
                <li>
                  Learnt analytical skill including data cleaning, analysis and visualization and tools like Tableau.
                </li>
                <li>Analysis and calculations using spreadsheets, SQL and R programming.</li>
              </ul>
            </EducationAccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Resume section */}
      <section className="relative px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 font-mono">Resume</h2>
          <Card className="p-8 bg-white text-[#0a1128] border-[#1a2b4a]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold font-mono">Alysha Hannani binti Azizul Rahman</h3>
              <Link href="/resume_alysha.pdf" download className="inline-block">
                <Button className="flex items-center gap-3 bg-white text-black border-none hover:bg-white rounded-xl relative overflow-hidden group px-8 py-4 text-lg">
                  <span className="relative z-10 flex items-center">
                    <FileText size={20} className="mr-2" />
                    <span>Download PDF</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
            </div>

            <div className="space-y-8">
              <ResumeSection title="Professional Experience">
                <ResumeItem title="Technical Writer" organization="Xpertis Solutions, Philippines" date="December 2022">
                  <ul className="list-disc pl-5 space-y-2 text-lg">
                    <li>Remote short-term internship</li>
                    <li>Learned how to create an app prototype in Figma.</li>
                    <li>Writing technical documentation based on the prototype given by the UI/UX designers.</li>
                  </ul>
                </ResumeItem>

                <ResumeItem title="Analytics Manager" organization="boostbalm Sdn. Bhd." date="May-June 2021">
                  <ul className="list-disc pl-5 space-y-2 text-lg">
                    <li>Part-time position</li>
                    <li>
                      Responsible for the Search Engine Optimization (SEO) of the company's website, and leverages the
                      website's traffic with Google Analytics.
                    </li>
                    <li>Strategising for Facebook and Instagram advertisements by narrowing audience targeting.</li>
                  </ul>
                </ResumeItem>
              </ResumeSection>

              <ResumeSection title="Technical Skills">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-xl">Programming Languages</h4>
                    <p className="text-lg">JavaScript, TypeScript, Python, Java, C++</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-xl">Frontend</h4>
                    <p className="text-lg">React, Next.js, HTML5, CSS3, Tailwind CSS</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-xl">Backend</h4>
                    <p className="text-lg">Node.js, Express, Django, Spring Boot</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-xl">Databases</h4>
                    <p className="text-lg">MongoDB, PostgreSQL, MySQL, Firebase</p>
                  </div>
                </div>
              </ResumeSection>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact section */}
      <section className="relative px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 font-mono">Contact Me</h2>
          <Card className="p-8 bg-white text-[#0a1128] border-[#1a2b4a]">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <p className="mb-8 text-lg">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                I'll try my best to get back to you!
              </p>
              <div className="space-y-6">
                <Link
                  href="mailto:alysha2803@gmail.com"
                  className="flex items-center gap-4 hover:text-blue-600 transition-colors text-lg"
                >
                  <Mail className="h-6 w-6" />
                  <span>alysha2803@gmail.com</span>
                </Link>
                <Link
                  href="https://github.com/alysha2803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:text-blue-600 transition-colors text-lg"
                >
                  <Github className="h-6 w-6" />
                  <span>github.com/alysha2803</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/alyshahannani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:text-blue-600 transition-colors text-lg"
                >
                  <Linkedin className="h-6 w-6" />
                  <span>linkedin.com/in/alyshahannani</span>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Fixed social links */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-4">
        <Link href="https://github.com/alysha2803" target="_blank" rel="noopener noreferrer">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-14 w-14 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <Github className="h-7 w-7" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/alyshahannani/" target="_blank" rel="noopener noreferrer">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-14 w-14 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <Linkedin className="h-7 w-7" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </Link>
      </div>
    </main>
  )
}

// Component for skill cards
function SkillCard({ title, children, level }: { title: string; children: React.ReactNode; level: number }) {
  return (
    <Card className="p-6 bg-[#0a1128]/50 border-[#1a2b4a]">
      <h3 className="font-semibold mb-3 text-xl text-white">{title}</h3>
      <div className="mb-3">
        <div className="h-3 w-full bg-[#1a2b4a] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400" style={{ width: `${level}%` }} />
        </div>
      </div>
      <p className="text-base text-gray-300">{children}</p>
    </Card>
  )
}

// Component for project accordion items
function ProjectAccordionItem({
  title,
  technologies,
  date,
  children,
}: {
  title: string
  technologies: string
  date: string
  children: React.ReactNode
}) {
  return (
    <AccordionItem value={title.toLowerCase().replace(/\s+/g, "-")} className="border-[#1a2b4a]">
      <AccordionTrigger className="font-mono text-xl md:text-2xl py-5 px-5 bg-[#0a1128]/50 hover:bg-[#1a2b4a]/50 rounded-t-lg">
        {title}
      </AccordionTrigger>
      <AccordionContent className="bg-[#0a1128]/30 p-6 rounded-b-lg border border-t-0 border-[#1a2b4a]">
        <div className="flex flex-col md:flex-row justify-between mb-5">
          <span className="text-base text-gray-300">{technologies}</span>
          <span className="text-base text-gray-300">{date}</span>
        </div>
        <p className="mb-6 text-lg">{children}</p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-black border-none hover:bg-white rounded-xl relative overflow-hidden group px-6 py-3"
          >
            <span className="relative z-10 flex items-center">
              <Github className="h-5 w-5 mr-2" />
              <span>View Code</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-black border-none hover:bg-white rounded-xl relative overflow-hidden group px-6 py-3"
          >
            <span className="relative z-10">Demo</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

// Component for education accordion items
function EducationAccordionItem({
  degree,
  institution,
  years,
  logoSrc,
  children,
}: {
  degree: string
  institution: string
  years: string
  logoSrc: string
  children: React.ReactNode
}) {
  return (
    <AccordionItem value={degree.toLowerCase().replace(/\s+/g, "-")} className="border-[#1a2b4a]">
      <AccordionTrigger className="font-mono text-xl md:text-2xl py-5 px-5 bg-[#0a1128]/50 hover:bg-[#1a2b4a]/50 rounded-t-lg">
        {degree}
      </AccordionTrigger>
      <AccordionContent className="bg-[#0a1128]/30 p-6 rounded-b-lg border border-t-0 border-[#1a2b4a]">
        <div className="flex flex-col md:flex-row justify-between mb-5">
          <span className="text-base text-gray-300">{institution}</span>
          <span className="text-base text-gray-300">{years}</span>
        </div>
        <div className="flex gap-6 mb-4">
          <div className="flex-shrink-0 flex items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt={`${institution} logo`}
                width={96}
                height={96}
                className="object-contain p-1"
              />
            </div>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

// Component for resume sections
function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 font-mono border-b border-[#1a2b4a] pb-3">{title}</h3>
      <div className="space-y-8">{children}</div>
    </div>
  )
}

// Component for resume items
function ResumeItem({
  title,
  organization,
  date,
  children,
}: {
  title: string
  organization: string
  date: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between mb-3">
        <h4 className="font-semibold text-xl">{title}</h4>
        <span className="text-base text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500 mb-3 text-lg">{organization}</p>
      <div>{children}</div>
    </div>
  )
}
