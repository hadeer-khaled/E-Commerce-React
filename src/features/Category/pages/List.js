import { useEffect, useState } from "react";
import { getCategoies, deleteCategoryById } from "api/category";
import Paginator from "components/Paginator/Paginator";
import CategoryCard from "features/Category/components/Card";
import Filter from "components/Filter/Filter";
import Loader from "components/Loader/Loader";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "AuthProvider";
import ExcelExport from "components/Excel/ExcelExport";

const List = () => {
  const auth = useAuth();

  const [categoriesList, setCategoriesList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState(null);

  useEffect(() => {
    fetchCategories(currentPage, perPage, filter);
  }, [currentPage, perPage]);

  const fetchCategories = (currentPage, perPage, filter) => {
    getCategoies({ page: currentPage, perPage: perPage, search: filter })
      .then((response) => {
        setCategoriesList(response.data.data);
        setPagination(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
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
      fetchCategories(currentPage, perPage);
      setFilter("");
    } else {
      fetchCategories(currentPage, perPage, filter?.toLowerCase());
    }
  };
  const deleteHandler = (category_id) => {
    setCategoryToBeDeleted(category_id);
    deleteCategoryById(category_id)
      .then((res) => {
        fetchCategories(currentPage, perPage, filter);
        toast.success(res.data.message, { autoClose: 2000 });
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      })
      .finally(() => {
        setCategoryToBeDeleted(null);
      });
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
          {auth.user.roles.includes("admin") && (
            <NavLink to="/categories/create" className="btn btn-info">
              {" "}
              Add a new Category
            </NavLink>
          )}
          <ExcelExport
            data={categoriesList}
            fileName="categories"
          ></ExcelExport>
        </div>

        <div className="px-4 grid grid-cols-4 gap-4">
          {categoriesList.length !== 0 ? (
            categoriesList.map((category) => {
              return (
                <CategoryCard
                  category={category}
                  deleteHandler={deleteHandler}
                  key={`category_${category.id}`}
                  categoryToBeDeleted={categoryToBeDeleted}
                ></CategoryCard>
              );
            })
          ) : (
            <h2> No Categories </h2>
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
