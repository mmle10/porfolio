export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const offsetPosition =
    element.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};
