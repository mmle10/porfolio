import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BtnArrow from "../components/BtnArrow";
import { myProjects, orbitSlides } from "../constants";
import ProjectDetails from "../components/ProjectDetails";

const Projects = ({ showOrbit = true }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const slide = orbitSlides[slideIndex] ?? orbitSlides[0];
  const focused =
    myProjects.find((project) => project.id === slide.projectId) ?? myProjects[0];
  const projectIndex = myProjects.findIndex((project) => project.id === focused.id);

  useEffect(() => {
    const onFocus = (event) => {
      if (typeof event.detail?.index === "number") setSlideIndex(event.detail.index);
    };
    window.addEventListener("orbit-focus", onFocus);
    return () => window.removeEventListener("orbit-focus", onFocus);
  }, []);

  const step = (dir) => {
    window.dispatchEvent(new CustomEvent("orbit-step", { detail: dir }));
  };

  return (
    <section
      id="projects"
      className="projects-section c-space pointer-events-none"
    >
      <div
        className={`grid items-start gap-x-16 gap-y-8 lg:gap-x-24 ${
          showOrbit ? "lg:grid-cols-2" : ""
        }`}
      >
        <div>
          <p className="pointer-events-auto text-sm tracking-widest uppercase text-sand">
            Selected work · {String(myProjects.length).padStart(2, "0")}
          </p>
          <h2 className="pointer-events-auto mt-3 text-heading">
            Projects I built{" "}
            <span className="title-accent">end to end.</span>
          </h2>
          <article className="project-info-card relative z-50 pointer-events-auto flex flex-col w-full h-[24rem] md:h-[26rem] overflow-hidden p-4 mt-6 md:p-6">
          <div className="relative flex-1 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={focused.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col"
              >
                <p className="text-sm text-sand">
                  {String(projectIndex + 1).padStart(2, "0")} /{" "}
                  {String(myProjects.length).padStart(2, "0")} · {focused.category}
                </p>
                <h3 className="mt-2 text-3xl font-semibold leading-tight">
                  {focused.title}
                </h3>
                <p className="flex-1 mt-3 overflow-hidden subtext">
                  {focused.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {focused.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 text-xs border rounded-full border-white/10 text-neutral-300"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={focused.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent px-5 py-2 text-sm text-white rounded-full hover-animation cursor-pointer"
                  >
                    Visit Live ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveProject(focused)}
                    className="px-5 py-2 text-sm text-white border rounded-full border-white/20 hover:bg-white/10 hover-animation cursor-pointer"
                  >
                    View details
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {showOrbit && (
            <div className="flex items-center gap-4 pt-6 mt-auto shrink-0">
              <button
                type="button"
                onClick={() => step(-1)}
                className="flex items-center justify-center w-10 h-10 text-white border rounded-full border-white/20 hover:bg-white/10 cursor-pointer"
                aria-label="Previous project"
              >
                <BtnArrow back />
              </button>
              <span className="text-sm text-neutral-400">
                {String(projectIndex + 1).padStart(2, "0")} /{" "}
                {String(myProjects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                className="flex items-center justify-center w-10 h-10 text-white border rounded-full border-white/20 hover:bg-white/10 cursor-pointer"
                aria-label="Next project"
              >
                <BtnArrow />
              </button>
            </div>
          )}
        </article>
        </div>

        {showOrbit ? (
          <div
            id="orbit-dock"
            className="relative min-h-[52vh] md:min-h-[58vh]"
            aria-hidden="true"
          />
        ) : (
          <img
            src={focused.image}
            alt={focused.title}
            className="object-cover w-full h-56 border md:h-72 rounded-xl border-white/10"
          />
        )}
      </div>

      {activeProject && (
        <div className="pointer-events-auto">
          <ProjectDetails
            {...activeProject}
            closeModal={() => setActiveProject(null)}
          />
        </div>
      )}
    </section>
  );
};

export default Projects;
