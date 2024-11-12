import { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  id: string;
  disabled?: boolean;
  className?: string;
}

const TextInput = ({
  value,
  onChange,
  placeholder = 'Enter text',
  name = 'input',
  id = 'input',
  disabled = false,
  className = '',
}: InputProps) => {
  return (
    <input
      type='text'
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`rounded-md border bg-white border-text border-opacity-20 appearance-none placeholder:text-inherit placeholder:opacity-50 disabled:opacity-50 focus:outline focus:outline-2 focus:border-opacity-100 px-3 py-2 text-sm w-full outline-none ${className}`}
    />
  );
};

export default TextInput;
