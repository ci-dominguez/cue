interface ButtonProps {
  children: React.ReactNode;
  variant: 'default' | 'secondary';
  className?: string;
}
const Button = ({ children, variant = 'default', className }: ButtonProps) => {
  const variantStylesMap: Record<string, string> = {
    default: 'bg-text text-content hover:bg-[#222]',
    secondary: 'bg-content-1 text-text-1 hover:bg-content-2 hover:text-text',
  };

  const variantStyles =
    variantStylesMap[variant] || variantStylesMap['default'];

  const baseStyles =
    'flex group not-prose self-start items-center justify-center rounded-md text-sm lg:text-base font-semibold';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
