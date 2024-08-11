import { useEffect, useState } from "react";

import { getCategoies } from "api/category"

import CategoryCard from 'features/Category/components/Crad'

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
        {categoriesList.length !== 0 ? 
        categoriesList.map((category)=>{
          return(
            <CategoryCard category ={category} key ={`category_${category.id}`}></CategoryCard>
          )
        }) : <h2> No Categories </h2> }
      </>
    )
  }
  export default List 