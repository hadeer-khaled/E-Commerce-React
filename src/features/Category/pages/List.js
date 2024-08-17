import { useEffect, useState } from "react";
import { getCategoies } from "api/category"
import Paginator from "components/Paginator/Paginator"
import CategoryCard from 'features/Category/components/Card'
import Filter from "components/Filter/Filter";
const List  = () => {
  const [categoriesList , setCategoriesList] = useState([])
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [filter ,  setFilter] = useState(null)

  useEffect(() => {
    fetchCategories(currentPage , perPage, filter);
  }, [currentPage , perPage]);

  const fetchCategories =(currentPage, perPage , filter)=>{
    getCategoies({page: currentPage , perPage:perPage , search:filter })
    .then(response => {
      setCategoriesList(response.data.data)
      setPagination(response.data);
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
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
    fetchCategories(currentPage , perPage) 
    :
    fetchCategories(currentPage , perPage, filter.toLowerCase())
  }
  

    return (
      <>
      <div className="container mx-auto" >
          <Filter filter={filter} handleFilterInput ={handleFilterInput} handleFilter = {handleFilter}></Filter>
          
          <div className="px-4 grid grid-cols-4 gap-4">
            {categoriesList.length !== 0 ? 
            categoriesList.map((category)=>{
              return(
                <CategoryCard category ={category} key ={`category_${category.id}`}></CategoryCard>
              )
            }) : <h2> No Categories </h2> }
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