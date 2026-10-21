const BtnArrow = ({ back = false }) => (
  <svg className="btn-arrow" viewBox="0 0 16 16" aria-hidden="true">
    {back ? (
      <path d="M13 8H4M7.5 4.5 3 8l4.5 3.5" />
    ) : (
      <path d="M3 8h9M8.5 4.5 13 8l-4.5 3.5" />
    )}
  </svg>
);

export default BtnArrow;
