import { useEffect, useState } from "react";
import { getCategoies } from "api/category"
import Paginator from "components/Paginator/Paginator"
import CategoryCard from 'features/Category/components/Card'

const List  = () => {
  const [categoriesList , setCategoriesList] = useState([])
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [filter ,  setFilter] = useState(null)

  useEffect(() => {
    fetchCategories(currentPage , perPage, filter);
  }, [currentPage , perPage]);

  const fetchCategories =(currentPage, perPage , filter)=>{
    getCategoies({page: currentPage , perPage:perPage , search:filter })
    .then(response => {
      setCategoriesList(response.data.data.data)
      setPagination(response.data.data);
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

  const handleFilter = ()=>{
    fetchCategories(currentPage , perPage, filter)
  }
  

    return (
      <>
      <div className="container mx-auto" >
          <div className=" mb-6 flex items-center gap-2" >
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={filter} onChange={handleFilterInput} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
              </label>
              <button className="btn btn-outline btn-info" onClick={handleFilter}>Filter</button>
          </div>
          
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