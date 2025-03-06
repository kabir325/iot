import { projectsData } from '@/data/projects';

export default async function ProjectsPage() {
  return (
    <>
      <section className='min-h-screen bg-black'>
        <section className="heading-main-box">
          <div className="heading-box">
            <h1 className="heading">
              Projects
            </h1>
          </div>
        </section>

        <section className='py-20 mx-[5%]'>
          <div className='mx-[5%]'>
            <p className='text-2xl font-semibold mb-8 text-white'>
              All Projects
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {projectsData.length > 0 ? (
                projectsData.map((project) => (
                  <div 
                    key={project.id}
                    className="project-card hover:scale-105 transition-transform duration-300"
                  >
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                      <p className="text-gray-600 mt-2">{project.description}</p>
                      {project.techStack && (
                        <div className="tech-stack mt-4">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="tech-item">{tech}</span>
                          ))}
                        </div>
                      )}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No projects found</p>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  )
}