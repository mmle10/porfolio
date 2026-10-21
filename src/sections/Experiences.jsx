import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
const Experiences = () => {
  return (
    <section className="experience-section" id="experiences">
      <Timeline data={experiences} />
    </section>
  );
};

export default Experiences;
