import Select from 'react-select';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'rgba(13, 17, 38, 0.05)',
    borderColor: 'rgba(147, 112, 219, 0.15)',
    borderWidth: '2px',
    borderRadius: '9999px',
    padding: '2px 8px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'rgba(147, 112, 219, 0.2)',
      background: 'rgba(147, 112, 219, 0.1)',
    },
    '&:focus-within': {
      borderColor: 'rgba(147, 112, 219, 0.2)',
      boxShadow: '0 0 0 2px rgba(147, 112, 219, 0.2)',
    },
  }),
  menu: (base) => ({
    ...base,
    background: 'rgba(13, 17, 38, 0.95)',
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    border: '1px solid rgba(147, 112, 219, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    padding: '8px',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected 
      ? 'rgba(147, 112, 219, 0.2)' 
      : state.isFocused 
        ? 'rgba(147, 112, 219, 0.1)' 
        : 'transparent',
    color: 'white',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '8px',
    margin: '4px 0',
    '&:hover': {
      background: 'rgba(147, 112, 219, 0.15)',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
    '&:hover': {
      color: 'rgba(147, 112, 219, 0.8)',
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
};

const options = [
  { value: 'planets', label: 'Planets' },
  { value: 'mountains', label: 'Mountains' },
];

const CustomSelect = ({ onChange, defaultValue }) => {
  return (
    <div className=" flex items-center justify-center w-full">
      <Select
        options={options}
        onChange={(option) => onChange(option.value)}
        defaultValue={defaultValue || options[0]}
        styles={customStyles}
        isSearchable={false}
        className="text-white"
      />
    </div>
  );
};

export default CustomSelect; 