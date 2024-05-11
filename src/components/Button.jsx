export default function Button({ type, text, color }) {
  return (
    <button
      className={`font-bold py-2 px-4 rounded text-sm sm:text-base md:text-base ${
        color === "green"
          ? "bg-primary-green text-white"
          : "bg-primary-yellow text-black"
      }`}
      type={type}
    >
      {text}
    </button>
  );
}
