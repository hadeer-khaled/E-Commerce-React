import { useEffect, useState } from "react";
import { getProducts } from "api/product"
import Paginator from "components/Paginator/Paginator"
import ProductCard from 'features/Product/components/Card'
import Filter from "components/Filter/Filter";
const List  = () => {
  const [productsList , setProductsList] = useState([])
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [filter ,  setFilter] = useState(null)

  useEffect(() => {
    fetchProducts(currentPage , perPage, filter);
  }, [currentPage , perPage]);

  const fetchProducts =(currentPage, perPage , filter)=>{
    getProducts({page: currentPage , perPage:perPage , search:filter })
    .then(response => {
      setProductsList(response.data.data)
      setPagination(response.data);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
  }
  const handlePageChange = (url) => {
    if (url) {
      const page = new URL(url).searchParams.get('page');
      setCurrentPage(Number(page));
    }
  };

  const handlePerPage = (event) => {
    setPerPage(event.target.value);
  };
  const handleFilterInput  =(e)=>{
    setFilter(e.target.value)
  }

  const handleFilter = (ToClear = false)=>{
    ToClear ?
    fetchProducts(currentPage , perPage) 
    :
    fetchProducts(currentPage , perPage, filter.toLowerCase())
  }
  

    return (
      <>
      <div className="container mx-auto" >
          <Filter filter={filter} handleFilterInput ={handleFilterInput} handleFilter = {handleFilter}></Filter>
          
          <div className="px-4 grid grid-cols-4 gap-4">
            {productsList.length !== 0 ? 
            productsList.map((product)=>{
              return(
                <ProductCard product ={product} key ={`product_${product.id}`}></ProductCard>
              )
            }) : <h2> No Products </h2> }
          </div>

          <div className="my-10">
              <Paginator pagination ={pagination} handlePageChange = {handlePageChange} 
                          perPage = {perPage} handlePerPage = {handlePerPage} > 
              </Paginator>
          </div>
      </div>
      </>
    )
  }
  export default List 