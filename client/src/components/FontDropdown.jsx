import {useState} from 'react';
import downIcon from '../assets/images/icon-arrow-down.svg';
import './FontDropdown.css';


const fonts = [
  { label: 'Sans Serif', value: 'Inter' },
  { label: 'Serif', value: 'Lora' },
  { label: 'Mono', value: 'Inconsolata' },
];

export default function FontDropdown({ font, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="font-dropdown-container">
      <div
        className="font-dropdown-trigger bold"
        onClick={() => setOpen(!open)}
        tabIndex={0}
        onBlur={() => setOpen(false)}
      >
        <span style={{ fontFamily: font }}>
          {fonts.find(f => f.value === font)?.label}
        </span>
        <img src={downIcon} alt="Dropdown icon" />
      </div>

      {open && (
        <ul className="font-dropdown-list bold">
          {fonts.map((f) => (
            <li
              key={f.value}
              onClick={() => handleSelect(f.value)}
              style={{ fontFamily: f.value }}
              className={f.value === font ? 'active' : ''}
            >
              {f.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}