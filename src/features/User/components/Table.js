import { NavLink } from "react-router-dom";

export default function Table({ usersList, handleDelete }) {
  return (
    <>
      <div className="overflow-x-auto">
        {usersList.length == 0 ? (
          <p>There is no users</p>
        ) : (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.roles}</td>
                    <td>
                      <button
                        className="btn btn-error mx-2"
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        Delete
                      </button>
                      <NavLink
                        to={`/users/${user.id}/edit`}
                        className="btn btn-info"
                      >
                        Edit
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
