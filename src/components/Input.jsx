export default function Input({
  type,
  placeholder,
  label,
  staticPrefix,
  name,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col pb-7">
      <label className="mb-0.5 text-md">{label}</label>
      <div className="flex items-center border p-2 rounded-lg w-full md:w-[450px] h-[40px] bg-bg-custom">
        {staticPrefix && (
          <span className="font-bold mr-0.5">{staticPrefix}</span>
        )}
        <input
          className="flex-grow text-md bg-transparent text-gray-custom outline-0"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
