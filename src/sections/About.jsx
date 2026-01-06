import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import { Frameworks } from "../components/Frameworks";
import CopyEmailButton from "../components/CopyEmailButton";
import { languages } from "../constants";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[15rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            alt="coding pov"
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Luis Melo</p>
            <p className="subtext">
              I'm a Full-Stack Developer with 4+ years of experience building scalable, high-performance web applications using Next.js, NestJS, React.js, Node.js, and TypeScript. I help businesses develop clean, maintainable, and secure solutions. My focus is on creating seamless user experiences backed by robust APIs and efficient code.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full">
            <p className="flex items-end text-5xl text-gray-500 select-none">
              CODE IS CRAFT
            </p>

            <Card
              style={{ rotate: "30deg", top: "20%", left: "10%" }}
              image="assets/logos/typescript.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "40%", left: "90%" }}
              image="assets/logos/node.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "20%", left: "30%" }}
              image="assets/logos/react.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "20%", right: "30%" }}
              image="assets/logos/git.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "80%", right: "10%" }}
              image="assets/logos/mongo.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "50%" }}
              image="assets/logos/three.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "20%", left: "70%" }}
              image="assets/logos/next.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "60%", left: "25%" }}
              image="assets/logos/javascript.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "10%", left: "45%" }}
              image="assets/logos/appwrite.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in Dominican Republic, and open to remote work worldwide
            </p>
            {languages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-neutral-400">Languages:</p>
                {languages.map((lang, idx) => (
                  <p key={idx} className="text-sm text-neutral-500">
                    {lang.name} - {lang.level}
                  </p>
                ))}
              </div>
            )}
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools taht
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
