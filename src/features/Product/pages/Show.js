import { useParams } from "react-router-dom";
import { getProductById } from "api/product";
import { useEffect, useState } from "react";
import Loader from "components/Loader/Loader";

export default function Show() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Error: Product not found</div>;
  }
  const images = product.images && product.images.length > 0 ? product.images : [{url:'https://gebelesebeti.ge/front/asset/img/default-product.png'}];
console.log("images" , images)
  return (
    <div className="container m-auto">
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <div className="badge badge-primary badge-outline">{product.price} EGP</div>

          <div className="carousel w-full">
            {images?.map((image, index) => (
              <div
                key={index}
                id={`item${index + 1}`}
                className="carousel-item w-full"
              >
                <img
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex w-full justify-center gap-2 py-2">
            {product.images?.map((_, index) => (
              <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
                {index + 1}
              </a>
            ))}
          </div>
          <div>{product.description}</div>
        </div>
      </div>
    </div>
  );
}
