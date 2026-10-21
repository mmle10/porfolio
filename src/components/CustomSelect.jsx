import Select from 'react-select';

const customStyles = {
  control: (base) => ({
    ...base,
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderColor: 'rgba(255, 255, 255, 0.10)',
    borderWidth: '1px',
    borderRadius: '9999px',
    minHeight: '40px',
    padding: '0 4px 0 10px',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.22)',
      background: 'rgba(255, 255, 255, 0.12)',
    },
    '&:focus-within': {
      borderColor: 'rgba(255, 255, 255, 0.22)',
      background: 'rgba(255, 255, 255, 0.12)',
      boxShadow: 'none',
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: '8px',
    background: 'rgba(16, 14, 28, 0.92)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
    overflow: 'hidden',
    padding: '6px',
    zIndex: 70,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? 'rgba(255, 255, 255, 0.10)'
      : state.isFocused
        ? 'rgba(255, 255, 255, 0.06)'
        : 'transparent',
    color: 'white',
    fontSize: '14px',
    padding: '8px 14px',
    cursor: 'pointer',
    borderRadius: '9999px',
    margin: '2px 0',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
    },
    '&:active': {
      background: 'rgba(255, 255, 255, 0.10)',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
    fontSize: '14px',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.6)',
    padding: '4px',
    '&:hover': {
      color: 'white',
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
};

const options = [
  { value: 'aqua', label: 'Aqua' },
  { value: 'violet', label: 'Violet' },
  { value: 'rose', label: 'Rose' },
];

const CustomSelect = ({ onChange, value }) => {
  return (
    <div className=" flex items-center justify-center w-full">
      <Select
        options={options}
        onChange={(option) => onChange(option.value)}
        value={value}
        aria-label="Theme"
        styles={customStyles}
        isSearchable={false}
        className="text-white"
      />
    </div>
  );
};

export default CustomSelect;
