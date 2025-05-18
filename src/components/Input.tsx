const Input = ({
  label,
  name,
  placeholder,
  type,
}: {
  label: string;
  name: string;
  placeholder: string;
  type: "text" | "password" | "number" | "email";
}) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={label}
        name={name}
        type={type}
        required
        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5032] focus:border-[#2c5032] transition-all duration-200 text-gray-900"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
