import { useState, useEffect } from "react";
import { getGenres, deleteGenre } from "../../../_services/genres";
import { Link } from "react-router-dom";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      await deleteGenre(id);
      setGenres(genres.filter((genre) => genre.id !== id));
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {/* ...existing code... */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {genres.length > 0 ? (
                  genres.map((genre) => (
                    <tr
                      key={genre.id}
                      className="border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {genre.name}
                      </th>
                      <td className="px-4 py-3">{genre.description}</td>
                      <td className="px-4 py-3 flex items-center justify-end relative">
                        <button
                          id={`dropdown-button-${genre.id}`}
                          onClick={() => toggleDropdown(genre.id)}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        {openDropdownId === genre.id && (
                          <div
                            id="dropdown"
                            className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            style={{ top: "100%", right: 0 }}
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby={`dropdown-button-${genre.id}`}
                            >
                              <li>
                                <Link
                                  to={`/admin/genres/edit/${genre.id}`}
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </Link>
                              </li>
                            </ul>
                            <div className="py-1">
                              <button
                                onClick={() => handleDelete(genre.id)}
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-center">
                      No genres found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* ...existing code... */}
        </div>
      </section>
    </>
  );
}
