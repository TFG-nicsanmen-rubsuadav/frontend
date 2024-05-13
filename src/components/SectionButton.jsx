export default function SectionButton({ type, text }) {
  return (
    <button
      className={`font-bold py-2 px-4 m-1 bg-transparent border-2 rounded-3xl border-primary-green text-sm sm:text-base md:text-base`}
      type={type}
    >
      {text}
    </button>
  );
}
