import { getCategoies } from "api/category"
const List  = () => {
  getCategoies()
    .then(response => {
        console.log('Categories fetched successfully:', response.data);
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
    return (
      <>
      <h1>List</h1>
      </>
    )
  }
  export default List 