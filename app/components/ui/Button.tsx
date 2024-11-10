interface ButtonProps {
  children: React.ReactNode;
  variant: 'default' | 'secondary';
}
const Button = ({ children, variant = 'default' }: ButtonProps) => {
  const variantStylesMap: Record<string, string> = {
    default: 'bg-text text-content',
    secondary: 'bg-content-1 text-text-1',
  };

  const variantStyles =
    variantStylesMap[variant] || variantStylesMap['default'];

  const baseStyles =
    'flex group not-prose self-start items-center justify-center rounded-md text-sm font-semibold';

  return (
    <button className={`${baseStyles} ${variantStyles}`}>{children}</button>
  );
};

export default Button;