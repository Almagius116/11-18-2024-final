function Filter({ filters, onFilterChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 sm:grid-cols-4 gap-4"
    >
      {filters.map((filter) => (
        <div key={filter.name} className="flex flex-col">
          <label
            htmlFor={filter.name}
            className="text-sm font-medium text-gray-700 mb-1"
          >
            {filter.label}
          </label>
          {filter.type === "select" ? (
            <select
              id={filter.name}
              name={filter.name}
              value={filter.value}
              onChange={onFilterChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={filter.name}
              name={filter.name}
              type={filter.type}
              value={filter.value}
              onChange={onFilterChange}
              placeholder={filter.placeholder}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        </div>
      ))}
      <div className="flex items-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}

export default Filter;
