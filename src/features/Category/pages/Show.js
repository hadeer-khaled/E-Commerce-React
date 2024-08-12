import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom"

import { getCategoryById } from "api/category"
import { deleteCategoryById } from "api/category"

import ProductCard from "features/Product/components/Card"
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
      {category ? 
      <>
        <p>{category.title}</p> 
        <button  className="btn btn-outline btn-error" onClick={()=>{deleteHandler(category.id)}}>Delete</button>
        <div className="container mx-auto px-4 grid grid-cols-4 gap-4">
        {category.products?.map(product =>{
          return(<ProductCard product = {product} key={`product_${product.id}`}></ProductCard>)
          })
        }
        </div>
        </>
       : "Not Found"}
      </>
    )
  }
  export default Show 