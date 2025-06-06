interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const sizeStyle: Record<'small' | 'medium' | 'large', string> = {
  small: 'w-[50px] h-[49px] px-2 py-2 text-sm',
  medium: 'w-[113px] h-[53px] px-4 py-3 text-base',
  large: 'w-[211px] h-[53px] px-6 py-3 text-lg',
};

const variantStyle: Record<'primary' | 'secondary' | 'tertiary', Record<'enabled' | 'disabled', string>> = {
  primary: {
    enabled: 'bg-[#64B5F7] text-white',
    disabled: 'bg-[#DADADA] text-[#8C8C8C]',
  },
  secondary: {
    enabled: 'bg-white border border-[#64B5F7] text-[#64B5F7]',
    disabled: 'border border-[#DADADA] text-[#DADADA]',
  },
  tertiary: {
    enabled: 'bg-transparent text-[#64B5F7]',
    disabled: 'bg-transparent text-[#DADADA]',
  },
};

export const IconTextButton = ({ variant = 'primary', size = 'medium', label, disabled = false, onClick, ...props}: ButtonProps) => {

  if (variant === 'tertiary' && size !== 'medium') return null;

  const state = disabled ? 'disabled' : 'enabled';
  const sizeClass = sizeStyle[size];
  const variantClass = variantStyle[variant][state];

  const renderContent = () => {
    const plusIcon = <span>＋</span>;

    if (size === 'small') return plusIcon;
    if (size === 'medium') return <>{plusIcon}{label}</>;
    return label;
  };

  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-[3px] ${sizeClass} ${variantClass} ${disabled ? 'cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick} 
      {...props}
    >
      {renderContent()}
    </button>
  );
};
