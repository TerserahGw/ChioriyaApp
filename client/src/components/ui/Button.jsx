import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-[#8B5E3C] hover:bg-[#6F4A2F] text-white focus:ring-[#8B5E3C]',
    secondary: 'bg-[#FFA726] hover:bg-[#E5941D] text-white focus:ring-[#FFA726]',
    outline: 'border border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white focus:ring-[#8B5E3C]',
    ghost: 'text-[#8B5E3C] hover:bg-[#F5F5F5] focus:ring-[#8B5E3C]',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;