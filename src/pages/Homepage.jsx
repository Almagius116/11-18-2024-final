import { useEffect, useState } from "react";
import "../App.css";

import { fetchShops } from "../api/shopService";
import Filter from "../components/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";
import SkeletonCard from "../components/Skeleton/Skeleton";
import Modal from "../components/Modal/Modal";
import CreateShopForm from "../components/Form/CreateShopForm";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function Homepage() {
  // store data secara state react nya
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    shopName: "",
    productName: "",
    stock: "",
    userName: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetchShops = async ({
    filters: appliedFilters = filters,
  } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShops({
        filters: appliedFilters,
        page: pagination.currentPage,
        size: pagination.pageSize,
      });
      if (data.isSuccess) {
        setShops(data.data.shops);
        setPagination((prev) => ({
          ...prev,
          totalPages: data.data.pagination.totalPages,
        }));
      } else {
        setError("Failed to fetch shops.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch data => fetch / axios
  useEffect(() => {
    handleFetchShops();
  }, [pagination.currentPage, pagination.pageSize]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    handleFetchShops();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      shopName: "",
      productName: "",
      stock: "",
      userName: "",
    };
    setFilters(clearedFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    handleFetchShops({ filters: clearedFilters });
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setPagination((prev) => ({ ...prev, pageSize: size, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
  };

  const handleCreateShopSuccess = () => {
    handleFetchShops();
  };

  const filterConfig = [
    {
      name: "shopName",
      label: "Shop Name",
      type: "text",
      value: filters.shopName,
      placeholder: "Enter shop name",
    },
    {
      name: "productName",
      label: "Product Name",
      type: "text",
      value: filters.productName,
      placeholder: "Enter product name",
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      value: filters.stock,
      placeholder: "Enter stock",
    },
    {
      name: "userName",
      label: "User Name",
      type: "text",
      value: filters.userName,
      placeholder: "Enter user name",
    },
  ];

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3 tex">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* header */}
      <header className="flex justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-blue-800">Binar Car Rental</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-700">
              Our Services
            </a>
            <a href="#" className="text-gray-700">
              Why Us
            </a>
            <a href="#" className="text-gray-700">
              Testimonial
            </a>
            <a href="#" className="text-gray-700">
              FAQ
            </a>
          </nav>
        </div>
        <button className="px-4 py-2 text-white bg-green-500 rounded-md">
          Register
        </button>
      </header>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Shops</h1>
        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Create New Shop
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateShopForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleCreateShopSuccess}
          />
        </Modal>

        <Filter
          filters={filterConfig}
          onFilterChange={handleFilterChange}
          onSubmit={handleFilterSubmit}
        />

        <div className="flex justify-between items-center mt-4">
          <div>
            <label
              htmlFor="pageSize"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={pagination.pageSize}
              onChange={handlePageSizeChange}
              className="border rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: pagination.pageSize }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.length === 0 ? (
              <p className="text-gray-500">No Data Avalilable.</p>
            ) : (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-white shadow-md"
                >
                  <img
                    src={shop?.products[0]?.images[0]}
                    alt={shop?.products[0]?.name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="font-semibold">{shop?.products[0]?.name}</h3>
                  <p className="text-green-500 font-bold">
                    Rp {shop?.products[0]?.price} / hari
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <span>4 orang</span>
                    <span>Manual</span>
                    <span>Tahun 2020</span>
                  </div>
                  <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">
                    Pilih Mobil
                  </button>
                </div>
              ))
            )}
          </section>
        )}
        {!loading && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}

export default Homepage;
