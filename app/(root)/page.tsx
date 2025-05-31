'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import VendorCarousel from '@/components/VendorCarousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Build, Simulate, and Innovate — IoT Without Hardware
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Dive into the world of Internet of Things with an all-in-one platform that lets you design, code, and simulate real-world IoT systems — no physical components required.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8">
                  <Link href="/signup">
                    Get Started for Free
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  <Link href="/explore">
                    Explore Projects
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <Image 
                src="/hero-illustration.svg" 
                alt="IoT Simulation Platform" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Is This Platform? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Revolutionizing IoT Education and Prototyping</h2>
          
          <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-6">
            <p>
              IoT hardware can be expensive and inaccessible to many learners, developers, and schools. This platform bridges the gap by offering a fully virtual IoT lab — where you can build circuits, program microcontrollers, and see live simulations in action.
            </p>
            <p>
              Whether you're a student learning the basics, a hobbyist prototyping a smart home system, or an educator setting up a virtual lab, this is your sandbox for innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Vendor Carousel */}
      <VendorCarousel />

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-xl font-bold mb-2">Drag-and-Drop Components</h3>
              <p className="text-gray-300">Design circuits using a growing library of microcontrollers, sensors, and output devices — no wiring mess.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2">Code in Real-Time</h3>
              <p className="text-gray-300">Program devices using real syntax in our built-in code editor, with support for common languages like C++ and MicroPython.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="text-xl font-bold mb-2">Live Simulations</h3>
              <p className="text-gray-300">Watch your circuits respond in real time based on your logic, sensor values, and interactions.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-bold mb-2">Project Management</h3>
              <p className="text-gray-300">Create, organize, and version your IoT projects easily. Free accounts support up to 50 history checkpoints per project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Who Is This For?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">👩‍🎓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Students & Learners</h3>
                <p className="text-gray-600">Build real-world systems without costly kits. Learn at your own pace with interactive tutorials and examples.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-4xl">👨‍🏫</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Educators & Institutions</h3>
                <p className="text-gray-600">Set up virtual labs to teach IoT and electronics. Create assignments and track student progress.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🧑‍💻</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Makers & Developers</h3>
                <p className="text-gray-600">Prototype fast without waiting for parts. Test ideas before investing in hardware.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🌍</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Curious Minds</h3>
                <p className="text-gray-600">Experiment and learn how devices communicate and automate. Discover the world of IoT without barriers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 mx-auto">1</div>
                <h3 className="text-xl font-bold mb-2 text-center">Sign up and Log in</h3>
                <p className="text-gray-600 text-center">Create a free account to access your personal workspace.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 mx-auto">2</div>
                <h3 className="text-xl font-bold mb-2 text-center">Start a Project</h3>
                <p className="text-gray-600 text-center">Launch the Workspace, choose components, and start wiring.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 mx-auto">3</div>
                <h3 className="text-xl font-bold mb-2 text-center">Code Your Logic</h3>
                <p className="text-gray-600 text-center">Open the editor and control your devices using code.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 mx-auto">4</div>
                <h3 className="text-xl font-bold mb-2 text-center">Run the Simulation</h3>
                <p className="text-gray-600 text-center">See your design come alive — tweak and test with ease.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Coming Soon</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold">Real-Time Collaboration</h3>
            </div>
            
            <div>
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold">AI-Powered Code Suggestions</h3>
            </div>
            
            <div>
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold">Community Project Sharing</h3>
            </div>
            
            <div>
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-xl font-bold">3D Circuit Visualization</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-4">🔔</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated!</h2>
          <p className="text-xl mb-8">Get updates on new components, features, and educational content.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              className="px-4 py-3 rounded-md text-gray-900 min-w-0 flex-1 max-w-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* End of content */}
    </div>
  );
}
