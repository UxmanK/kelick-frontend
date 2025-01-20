interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search employee"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border px-4 py-2 rounded-md shadow-sm focus:outline-teal-500"
    />
  );
}
