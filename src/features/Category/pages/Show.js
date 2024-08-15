import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, deleteCategoryById } from "api/category";
import ProductCard from "features/Product/components/Card";

const Show = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);
        setCategory(response.data.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchCategory();
  }, [id]);

  const deleteHandler = (category_id) => {
    deleteCategoryById(category_id)
      .then((res) => {
        console.log(res.data.message);
        navigator("/categories");
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {category ? (
        <>
          <p className="text-2xl font-bold">{category.title}</p>
          <button className="btn btn-outline btn-error mt-4" onClick={() => deleteHandler(category.id)}>
            Delete
          </button>
          <div className="container mx-auto px-4 grid grid-cols-4 gap-4 mt-4">
            {category.products?.map((product) => (
              <ProductCard product={product} key={`product_${product.id}`} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-red-500">Not Found</p>
      )}
    </>
  );
};

export default Show;
