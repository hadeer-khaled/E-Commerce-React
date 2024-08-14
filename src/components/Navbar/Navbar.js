import { useAuth } from "AuthProvider";

const Navbar = () => {
       const auth = useAuth();

    return (
     <>
      <div className="navbar bg-base-100">
             <a className="btn btn-ghost text-xl">daisyUI</a>
              <button onClick={auth.logoutAction}>Logout</button>
      </div>
      <div>
      </div>
     </>
    )
  }
  export default  Navbar

  