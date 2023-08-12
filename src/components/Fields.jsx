import clsx from "clsx";

const formClasses =
  "block w-full appearance-none rounded-md border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm";

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  );
}

export function TextField({
  id,
  label,
  error,
  value,
  name,
  type = "text",
  className = "",
  register,
  onChange,
  ...props
}) {
  return (
    <div className={`${className} relative`}>
      {label && <Label id={id}>{label}:</Label>}
      <input
        id={id}
        type={type}
        {...props}
        className={formClasses}
        {...(register && register(id))}
        {...(onChange && { onChange })}
        {...(name && { name })}
        {...(value && { value })}
      />
      {error && (
        <span className="text-xs italic text-danger drop-shadow-sm">
          {error}
        </span>
      )}
    </div>
  );
}

export const TextAreaField = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
  className = "",
  register,
  ...props
}) => {
  return (
    <div className={`${className} relative`}>
      {label && <Label id={id}>{label}:</Label>}
      <textarea
        id={id}
        {...props}
        className={formClasses}
        {...(register && register(id))}
        {...(onChange && { onChange })}
        {...(name && { name })}
        {...(value && { value })}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};

export const NumberField = ({
  id,
  label,
  error,
  name,
  onChange,
  value,
  className = "",
  register,
  ...props
}) => {
  return (
    <div className={`${className} relative`}>
      {label && <Label id={id}>{label}:</Label>}
      <input
        id={id}
        type="number"
        {...props}
        className={formClasses}
        {...(register && register(id))}
        {...(onChange && { onChange })}
        {...(name && { name })}
        {...(value && { value })}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};

export const CheckboxField = ({
  id,
  label,
  className = "",
  name,
  value,
  checked,
  onOptionChange,
  ...props
}) => {
  return (
    <div className={`${className} relative`}>
      <div className="flex items-center cursor-pointer">
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          {...props}
          className="w-5 h-5 border-gray-300 cursor-pointer text-primary focus:ring-primary"
          onChange={onOptionChange}
        />
        <label
          htmlFor={id}
          className="block ml-3 text-sm font-semibold cursor-pointer text-graydark dark:text-gray-default md:text-base"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export const SelectField = ({
  id,
  label,
  className = "",
  name,
  value,
  onChange,
  register,
  options,
  ...props
}) => {
  return (
    <div className={`${className} relative`}>
      {label && <Label id={id}>{label}:</Label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 mt-1 border border-gray-200 rounded-md shadow-sm bg-gray-default dark:bg-boxdark focus:outline-none focus:ring-green focus:border-green-300 sm:text-sm"
        {...(register && register(id))}
        {...props}
      >
        {options.map((option) => (
          <option key={option} selected={value === option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
