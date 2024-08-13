import { useEffect, useState } from "react";
import {decode} from 'html-entities';

import { getCategoies } from "api/category"

import CategoryCard from 'features/Category/components/Card'

const List  = () => {
  const [categoriesList , setCategoriesList] = useState([])
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    fetchCategories(currentPage , perPage);
  }, [currentPage , perPage]);

  const fetchCategories =(currentPage, perPage)=>{
    getCategoies({page: currentPage , perPage:perPage})
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
  

    return (
      <>
      <div class="container mx-auto px-4 grid grid-cols-4 gap-4">

        {categoriesList.length !== 0 ? 
        categoriesList.map((category)=>{
          return(
            <CategoryCard category ={category} key ={`category_${category.id}`}></CategoryCard>
          )
        }) : <h2> No Categories </h2> }
      </div>

      <div className="my-10">
        <div className="join">
        {pagination.links && pagination.links.map((link, index) => (
          <button
            className="join-item btn btn-md"
            key={index}
            disabled={!link.url || link.active}
            onClick={() => handlePageChange(link.url)}
          >
            {decode(link.label)}
          </button>
        ))}
        
        <select className="select select-bordered w-full max-w-xs"
                value={perPage} 
                onChange={handlePerPage}
          >
          <option value={4}>4</option>
          <option value={8} selected>8</option>
          <option value={16}>16</option>
        </select>

        </div>
      </div>
      </>
    )
  }
  export default List 