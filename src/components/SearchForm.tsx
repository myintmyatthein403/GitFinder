export interface SearchFormProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="🔍 Search GitHub users..."
        name='text'
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
      />
      <button
        type="submit"
        className="p-3 bg-blue-600 text-white rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Search
      </button>
    </form>
  )
}
