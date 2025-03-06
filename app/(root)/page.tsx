'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { skills } from '@/data/skills';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 530);
    };
    console.log(isMobile);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>

      <section className="about-section min-h-[70vh]">
        {/* Image Section */}
        <div className="image-section x-trans-box">
          <div className="w-[30vw] max-w-[240px] min-w-[200px] aspect-square relative">
            <Image
              src="/prof.jpg"
              alt="profile"
              fill
              className="profile-image object-cover rounded-full"
              sizes="(max-inline-size: 600px) 50vw, 30vw"
            />
          </div>
          <p className="name">Kabir Sahu</p>
        </div>
        {/* Text Section */}
        <div className="text-section">
          <p className="bio-heading">Bio:</p>
          <p className="bio">
            An enthusiastic and detail-oriented Software Engineer 
            with a passion for building efficient, scalable, and 
            user-friendly applications. Recently stepped into the 
            tech industry with a strong foundation in programming, 
            problem-solving, and software development best practices. 
            Skilled in languages like Python, Java, and JavaScript, 
            with experience in database management and web development. 
            Always eager to learn new technologies, collaborate with 
            teams, and contribute to innovative projects. Excited to 
            grow, adapt, and make an impact in the world of software 
            engineering.
          </p>
        </div>
      </section>

      {/* Skills section with dark gray background */}
      <section className="black-bg skills min-h-screen">
        <h2 className="sub-heading">Skills</h2>
        <div className="skills-box">
          {skills.map((skill) => (
            <div 
              key={skill.id} 
              className={`skill-box`}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* Education section with light gray background */}
      <section className="education-section min-h-screen">
        <h2 className="sub-heading">Education</h2>
        <div className="education-timeline">
          <div className="education-block">
            <h3 className="degree">BTech. in Computer Science</h3>
            <p className="institution">PES University</p>
            <p className="year">(2022 - 2026)</p>
            <p className="score">CGPA : 8.13</p>
          </div>
          
          <div className="education-block">
            <h3 className="degree">Senior Secondary (XII)</h3>
            <p className="institution">The Radiant Way School</p>
            <p className="year">(2017 - 2020)</p>
            <p className="score">Percentage : 85.2%</p>
          </div>
          
          <div className="education-block">
            <h3 className="degree">Secondary (X)</h3>
            <p className="institution">The Radiant Way School</p>
            <p className="year">(2015 - 2017)</p>
            <p className="score">Percentage : 88.8%</p>
          </div>
        </div>
      </section>
    </>
  );
}
