import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBoxProps {
  onClose: () => void;
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onClose, onSearch }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md fixed top-0 left-0 right-0 m-4 max-w-md mx-auto">
      {/* Close icon */}
      <div className="cursor-pointer mb-4" onClick={onClose}>
        <FaTimes size={20} color="black" />
      </div>
      {/* Input field*/}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 rounded-md mx-auto mb-4 block w-full"
      />
      {/* Search icon */}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={onSearch}
        >
          Search
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
