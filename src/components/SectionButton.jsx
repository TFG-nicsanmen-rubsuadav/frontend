export default function SectionButton({ type, text }) {
  const handleClick = () => {
    document
      .getElementById(text)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      onClick={handleClick}
      className={`font-bold py-2 px-4 m-1 bg-transparent border-2 rounded-3xl border-primary-green text-sm sm:text-base md:text-base hover:bg-primary-green hover:text-white`}
      type={type}
    >
      {text}
    </button>
  );
}