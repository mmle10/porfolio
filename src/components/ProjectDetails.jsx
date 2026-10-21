import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  category,
  image,
  images,
  mobileImages,
  tags,
  href,
  closeModal,
}) => {
  const imageArray = images && images.length > 0 ? images : [image];
  const mobileImageArray =
    mobileImages && mobileImages.length > 0 ? mobileImages : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewer, setViewer] = useState(null);

  const openViewer = (list, index) => setViewer({ images: list, index });
  const viewerNext = () =>
    setViewer((v) =>
      v ? { ...v, index: (v.index + 1) % v.images.length } : v
    );
  const viewerPrev = () =>
    setViewer((v) =>
      v
        ? { ...v, index: (v.index - 1 + v.images.length) % v.images.length }
        : v
    );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageArray.length) % imageArray.length
    );
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        if (viewer) setViewer(null);
        else closeModal();
      }
      if (event.key === "ArrowRight") {
        if (viewer) viewerNext();
        else nextImage();
      }
      if (event.key === "ArrowLeft") {
        if (viewer) viewerPrev();
        else prevImage();
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeModal, imageArray.length, viewer]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full p-3 sm:p-6 bg-[#030412]/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        className="project-dialog relative w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute p-2.5 rounded-full top-3 right-3 sm:top-4 sm:right-4 bg-black/50 hover:bg-black/80 border border-white/15 backdrop-blur-sm z-20 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <img src="/assets/close.svg" className="w-4 h-4" alt="" />
        </button>

        <div className="flex flex-col md:grid md:grid-cols-[1.35fr_1fr] flex-1 min-h-0">
        <div className="relative flex flex-col flex-shrink-0 md:flex-shrink md:min-h-0 bg-[#07040f]">
          <div className="relative h-60 sm:h-80 md:h-auto md:flex-1 md:min-h-0 overflow-hidden">
            <motion.img
              key={imageArray[currentImageIndex]}
              src={imageArray[currentImageIndex]}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover object-top"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {mobileImageArray.length > 0 && (
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-medium tracking-widest uppercase text-white/90 bg-black/55 border border-white/15 rounded-full backdrop-blur-sm">
                Desktop
              </span>
            )}
            <button
              onClick={() => openViewer(imageArray, currentImageIndex)}
              className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-widest uppercase text-white/90 bg-black/55 hover:bg-black/85 border border-white/15 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              aria-label="Expand image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M15 3h6v6" />
                <path d="M9 21H3v-6" />
                <path d="M21 3l-7 7" />
                <path d="M3 21l7-7" />
              </svg>
              Expand
            </button>
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/55 hover:bg-black/85 border border-white/20 backdrop-blur-sm transition-colors touch-manipulation cursor-pointer"
                  aria-label="Previous image"
                >
                  <img
                    src="/assets/arrow-right.svg"
                    className="w-4 h-4 rotate-180"
                    alt=""
                  />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/55 hover:bg-black/85 border border-white/20 backdrop-blur-sm transition-colors touch-manipulation cursor-pointer"
                  aria-label="Next image"
                >
                  <img src="/assets/arrow-right.svg" className="w-4 h-4" alt="" />
                </button>
                <span className="absolute bottom-3 right-3 z-10 px-2.5 py-1 text-[11px] font-medium tracking-widest text-white/90 bg-black/55 border border-white/15 rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1} / {imageArray.length}
                </span>
              </>
            )}
          </div>
          {imageArray.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto flex-shrink-0">
              {imageArray.map((src, index) => (
                <button
                  key={src + index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-none w-20 h-14 rounded-lg overflow-hidden border bg-black/50 transition-all cursor-pointer ${
                    index === currentImageIndex
                      ? "border-white/80 opacity-100"
                      : "border-white/10 opacity-50 hover:opacity-85"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 sm:p-7 md:p-8 overflow-y-auto flex-1 min-h-0">
          {category && <p className="about-kicker">{category}</p>}
          <h5 className="mt-3 mb-3 text-2xl sm:text-3xl font-bold leading-tight text-white">
            {title}
          </h5>
          <p className="mb-4 text-sm sm:text-base font-normal text-neutral-300 leading-relaxed">
            {description}
          </p>
          {subDescription.map((subDesc, index) => (
            <p
              key={index}
              className="mb-4 text-sm sm:text-base font-normal text-neutral-400 leading-relaxed"
            >
              {subDesc}
            </p>
          ))}

          <p className="mt-6 mb-3 text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-[rgba(232,228,255,0.5)]">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-[rgba(196,188,255,0.14)] bg-white/5 text-xs sm:text-sm text-neutral-200"
              >
                <img
                  src={tag.path}
                  alt=""
                  className="rounded-full w-6 h-6 object-contain"
                />
                {tag.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white rounded-full hover-animation cursor-pointer"
            >
              View Project
              <img src="/assets/arrow-up.svg" className="w-3.5 h-3.5" alt="" />
            </a>
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2.5 text-sm text-white border rounded-full border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
        </div>

        {mobileImageArray.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/10 px-5 sm:px-7 py-4">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <p className="text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-[rgba(232,228,255,0.5)]">
                Mobile app
              </p>
              <p className="text-[11px] text-neutral-500">
                Tap any screen to expand
              </p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {mobileImageArray.map((src, index) => (
                <button
                  key={src + index}
                  onClick={() => openViewer(mobileImageArray, index)}
                  className="flex-none h-32 sm:h-44 rounded-xl overflow-hidden border border-white/10 hover:border-white/40 transition-colors cursor-pointer"
                  aria-label={`Expand mobile screen ${index + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-auto object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {viewer && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#030412]/95 backdrop-blur-md p-4 sm:p-8"
          onClick={(event) => {
            event.stopPropagation();
            setViewer(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              setViewer(null);
            }}
            className="absolute p-2.5 rounded-full top-4 right-4 bg-black/50 hover:bg-black/80 border border-white/15 z-20 transition-colors cursor-pointer"
            aria-label="Close expanded image"
          >
            <img src="/assets/close.svg" className="w-4 h-4" alt="" />
          </button>
          <motion.img
            key={viewer.images[viewer.index]}
            src={viewer.images[viewer.index]}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          />
          {viewer.images.length > 1 && (
            <>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  viewerPrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/55 hover:bg-black/85 border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <img
                  src="/assets/arrow-right.svg"
                  className="w-4 h-4 rotate-180"
                  alt=""
                />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  viewerNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/55 hover:bg-black/85 border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <img src="/assets/arrow-right.svg" className="w-4 h-4" alt="" />
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1 text-[11px] font-medium tracking-widest text-white/90 bg-black/55 border border-white/15 rounded-full backdrop-blur-sm">
                {viewer.index + 1} / {viewer.images.length}
              </span>
            </>
          )}
        </div>
      )}
    </motion.div>,
    document.body
  );
};

export default ProjectDetails;
