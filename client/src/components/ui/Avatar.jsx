const Avatar = ({ src, alt, size = 'md', className = '', ...props }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden flex items-center justify-center bg-gray-200 ${className}`} {...props}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-600 font-semibold">{alt ? alt.charAt(0).toUpperCase() : 'U'}</span>
      )}
    </div>
  );
};

export default Avatar;