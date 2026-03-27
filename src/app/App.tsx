import { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SmoothScroll>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
            <CustomCursor />
            <Navbar />
            <main>
              <ErrorBoundary fallback={<div className="h-screen flex items-center justify-center">Error loading Hero section</div>}>
                <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                  <Hero />
                </Suspense>
              </ErrorBoundary>
              <About />
              <Services />
              <Projects />
              <Experience />
              <Testimonials />
              <ErrorBoundary fallback={<div className="h-96 flex items-center justify-center">Error loading Contact section</div>}>
                <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                  <Contact />
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </ThemeProvider>
    </ErrorBoundary>
  );
}