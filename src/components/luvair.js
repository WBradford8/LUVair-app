import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

// export const LUVair = () => {
//     const [customers, assignCustomers] = useState([])

//     useEffect(
//         () => {
//             fetch()
//                 .then(res => res.json())
//                 .then(
//                     (customers) => { }
//                 )
//         },
//         []
//     )

//     return (
//         <h1>Honey Rae's Repair Shop</h1>

//         {
//             customers.map(
//                 () => { }
//             )
//         }
//     )
// }

export const LUVair = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("luvair_user")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );
