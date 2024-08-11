import { useEffect, useState } from "react";

import { useParams } from "react-router-dom"

import { getCategoryById } from "api/category"

const Show  = () => {
  const {id} = useParams();

  const [category , setCategory] = useState(null)
  useEffect(()=>{
    getCategoryById(id)
    .then(response => {
      setCategory(response.data.data)
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
  } , [])

    return (
      <>
      <div>Show Cat {id}</div>
      {category ? <p>{category.title}</p> : "Not Found"}
      </>
    )
  }
  export default Show 