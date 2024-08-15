import { useParams } from "react-router-dom";

export default function Show() {
  const { id } = useParams();

  return <div>Show {id}</div>;
}
