import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  images,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const previewImage = images && images.length > 0 ? images[0] : image;
  return (
    <>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-10 space-y-4 sm:space-y-0"
        onMouseEnter={() => setPreview(previewImage)}
        onMouseLeave={() => setPreview(null)}
      >
        <div className="w-full sm:w-auto">
          <p className="text-xl sm:text-2xl font-medium">{title}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id} className="text-sm sm:text-base">{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation text-sm sm:text-base"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-4 sm:w-5" alt=""/>
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          images={images}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
