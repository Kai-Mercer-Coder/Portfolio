import { useState } from 'react'
import { Navbar } from "../src/portfolio/Navbar";
import { Hero } from "../src/portfolio/Hero";
import { Work } from "../src/portfolio/Work";
import { Stack } from "../src/portfolio/Stack";
import { About } from "../src/portfolio/About";
import { Contact } from "../src/portfolio/Contact";
import { AmbientAudio } from "../src/portfolio/AmbientAudio";
import { SmoothScroll } from "../src/portfolio/SmoothScroll";
import { CustomCursor } from "../src/portfolio/CustomCursor";
import './App.css'

function App() {
  return (
    <>
      <main className="relative min-h-screen bg-background text-foreground noise">
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <Hero />
        <Work />
        <Stack />
        <About />
        <Contact />
        <AmbientAudio />

      </main>
    </>
  )
}

export default App
