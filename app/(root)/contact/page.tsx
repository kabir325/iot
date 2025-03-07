'use client'
import React from 'react'
import { useState, useEffect } from 'react';

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 530);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <section className='min-h-screen black-bg'>
      <section className="heading-main-box bg-black">
        <div className="heading-box black-bg">
          <h1 className="heading ">
            Contact Me
          </h1>
        </div>
      </section>
      
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="contact-form">
            <h2>Drop your details!</h2>
            <form className="space-y-6" action="https://formsubmit.co/kabirsahu725@gmail.com" method="POST">
                <label htmlFor='name' className='form-label'>Name</label>
                <input 
                  type='text' 
                  id='name' 
                  name='name'
                  className='form-input'
                  placeholder='Your name'
                  required
                />
                <label htmlFor='email' className='form-label'>Email</label>
                <input 
                  type='email' 
                  id='email' 
                  name='email'
                  className='form-input'
                  placeholder='your.email@example.com'
                  required
                />
                <label htmlFor='phone' className='form-label'>Phone Number</label>
                <input 
                  type='tel' 
                  id='phone' 
                  name='phone'
                  className='form-input'
                  placeholder='Your phone number'
                  required
                />
                <label htmlFor='message' className='form-label'>Message</label>
                <textarea 
                  id='message' 
                  name='message'
                  rows={4} 
                  className='form-input'
                  placeholder='Your message'
                  required
                ></textarea>
              <button 
                type='submit' 
                className='submit-button'
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="contact-info black-bg">
            <h2>Contact Information</h2>
            <div className='info-section'>
              <div>
                <h3 className='info-heading'>Address</h3>
                <p className='info-text'>
                  H-404, Smondo 3<br />
                  Bangalore, Code - 560100<br />
                  India
                </p>
              </div>
              <div>
                <h3 className='info-heading'>Email</h3>
                <a href='mailto:kabirsahu725@gmail.com' className='info-link'>
                  kabirsahu725@gmail.com
                </a>
              </div>
              <div>
                <h3 className='info-heading'>Phone</h3>
                <a href='tel:+91 7587109160' className='info-link'>
                  +91 75871 09160
                </a>
              </div>
              <div>
                <h3 className='info-heading'>Social Links</h3>
                <div className="social-links flex space-x-4">
                  <a href='https://www.linkedin.com/in/kabir-sahu-b7401b208/' className='info-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href='https://github.com/kabir325' className='info-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.879.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href='https://wa.me/7587109160?text=' className='info-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.471-.15-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
    </>
  )
};