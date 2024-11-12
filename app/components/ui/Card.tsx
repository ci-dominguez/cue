interface HeaderProps {
  children: React.ReactNode;
}

export const CardHeader = ({ children }: HeaderProps) => {
  return (
    <h3 className='font-lora font-semibold text-xl items-center text-text'>
      {children}
    </h3>
  );
};

interface ContentProps {
  children: React.ReactNode;
}

export const CardContent = ({ children }: ContentProps) => {
  return <div className='flex flex-col space-y-3 mt-4'>{children}</div>;
};

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className='rounded-lg text-text-1 bg-content-1 border border-content-2 p-4 space-y-3'>
      {children}
    </div>
  );
};

export default Card;
