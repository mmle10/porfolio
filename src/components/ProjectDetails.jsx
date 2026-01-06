import React, { useState } from "react";
import { motion } from "framer-motion";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  images,
  tags,
  href,
  closeModal,
}) => {
  const imageArray = images && images.length > 0 ? images : [image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto p-2 sm:p-4 backdrop-blur-sm mt-6">
      <motion.div
        className="relative w-full max-w-7xl max-h-[90vh] border shadow-sm rounded-xl sm:rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-auto flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 sm:p-2.5 rounded-sm top-2 right-2 sm:top-5 sm:right-5 bg-midnight hover:bg-gray-500 z-20"
        >{""}
          <img src="assets/close.svg" className="w-4 h-4 sm:w-6 sm:h-6" alt=""/>
        </button>
        <div className="relative flex-shrink-0 md:h-[600px] overflow-hidden">
          {imageArray.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-2 rounded-full bg-midnight/90 hover:bg-midnight border border-white/20 backdrop-blur-sm transition-all touch-manipulation"
                aria-label="Previous image"
              >
                <img src="assets/arrow-right.svg" className="w-5 h-5 sm:w-4 sm:h-4 rotate-180" alt="Previous" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-2 rounded-full bg-midnight/90 hover:bg-midnight border border-white/20 backdrop-blur-sm transition-all touch-manipulation"
                aria-label="Next image"
              >
                <img src="assets/arrow-right.svg" className="w-5 h-5 sm:w-4 sm:h-4" alt="Next" />
              </button>
              <div className="absolute bottom-2 sm:bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-1">
                {imageArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full transition-all touch-manipulation ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          <img 
            src={imageArray[currentImageIndex]} 
            alt={title} 
            className="w-full h-full object-cover rounded-t-xl sm:rounded-t-2xl transition-opacity duration-300" 
          />
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex-shrink-0 overflow-y-auto flex-1">
          <h5 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h5>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg font-normal text-neutral-400 leading-relaxed">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg font-normal text-neutral-400 leading-relaxed">{subDesc}</p>
          ))}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover-animation"
                />
              ))}
            </div>
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium cursor-pointer hover-animation w-full sm:w-auto justify-center sm:justify-start py-2 sm:py-0"
            >
              View Project{" "}
              <img src="assets/arrow-up.svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" alt="" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
