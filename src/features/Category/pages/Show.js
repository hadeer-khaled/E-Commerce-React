import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom"

import { getCategoryById } from "api/category"
import { deleteCategoryById } from "api/category"

const Show  = () => {
  const navigator = useNavigate()
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
  } , [id])

  const deleteHandler = (category_id)=>{
    deleteCategoryById(category_id)
    .then(res=>{
      console.log(res.data.message)
      navigator("/categories")
    })
  }

    return (
      <>
      <div>Show Cat {id}</div>
      {category ? <p>{category.title}</p> : "Not Found"}
      <button onClick={()=>{deleteHandler(category.id)}}>Delete</button>
      </>
    )
  }
  export default Show 