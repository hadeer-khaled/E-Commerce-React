import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, deleteCategoryById } from "api/category";
import ProductCard from "features/Product/components/Card";
import Loader from "components/Loader/Loader";
const Show = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
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
        console.error("Error deleting category:", error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {category ? (
        <>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <button
              className="btn btn-outline btn-error mx-6"
              onClick={() => deleteHandler(category.id)}
            >
              Delete
            </button>
          </div>
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
