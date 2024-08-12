import { useEffect, useState } from "react";

import { getCategoies } from "api/category"

import CategoryCard from 'features/Category/components/Card'

const List  = () => {
  const [categoriesList , setCategoriesList] = useState([])
  useEffect(()=>{
    getCategoies()
    .then(response => {
      setCategoriesList(response.data.data)
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
  } , [])

    return (
      <>
      <div className="container mx-auto px-4 grid grid-cols-4 gap-4">
          {categoriesList.length !== 0 ? 
          categoriesList.map((category)=>{
            return(
              <CategoryCard category ={category} key ={`category_${category.id}`}></CategoryCard>
            )
          }) : <h2> No Categories </h2> }
        </div>
      </>
    )
  }
  export default List 