import { useEffect, useState } from "react";
import { getProducts, deleteProductById } from "api/product";
import Paginator from "components/Paginator/Paginator";
import ProductCard from "features/Product/components/Card";
import Filter from "components/Filter/Filter";
import Loader from "components/Loader/Loader";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "AuthProvider";
import { getCategoies } from "api/category";

const List = () => {
  const auth = useAuth();
  const [productsList, setProductsList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts(currentPage, perPage, selectedCategory, filter);
  }, [currentPage, perPage, selectedCategory]);

  useEffect(() => {
    getCategoies()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const fetchProducts = (currentPage, perPage, selectedCategory, filter) => {
    getProducts({
      page: currentPage,
      perPage: perPage,
      search: filter,
      category: selectedCategory,
    })
      .then((response) => {
        setProductsList(response.data.data);
        setPagination(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  const handlePageChange = (url) => {
    if (url) {
      const page = new URL(url).searchParams.get("page");
      setCurrentPage(Number(page));
    }
  };

  const handlePerPage = (event) => {
    setPerPage(event.target.value);
  };
  const handleFilterInput = (e) => {
    setFilter(e.target.value);
  };

  const handleFilter = (ToClear = false) => {
    if (ToClear) {
      setFilter("");
      console.log("selectedCategory", selectedCategory);
      fetchProducts(currentPage, perPage, selectedCategory);
    } else {
      fetchProducts(
        currentPage,
        perPage,
        selectedCategory,
        filter?.toLowerCase()
      );
    }
  };

  const deleteHandler = (product_id) => {
    deleteProductById(product_id)
      .then((res) => {
        fetchProducts(currentPage, perPage, selectedCategory, filter);
        toast.success(res.data.message, { autoClose: 2000 });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <Filter
            filter={filter}
            handleFilterInput={handleFilterInput}
            handleFilter={handleFilter}
          ></Filter>
          <select
            name="category_id"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {auth.user.roles.includes("admin") && (
            <NavLink to="/products/create" className="btn btn-info">
              Add a new Product
            </NavLink>
          )}
        </div>

        <div className="px-4 grid grid-cols-4 gap-4">
          {productsList.length !== 0 ? (
            productsList.map((product) => {
              return (
                <ProductCard
                  product={product}
                  deleteHandler={deleteHandler}
                  key={`product_${product.id}`}
                ></ProductCard>
              );
            })
          ) : (
            <h2> No Products </h2>
          )}
        </div>

        <div className="my-10">
          <Paginator
            pagination={pagination}
            handlePageChange={handlePageChange}
            perPage={perPage}
            handlePerPage={handlePerPage}
          ></Paginator>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default List;
