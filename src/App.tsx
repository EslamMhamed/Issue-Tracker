
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AllIssues from "./pages/AllIssues";
import OpenIssues from "./pages/OpenIssues";
import ClosedIssues from "./pages/ClosedIssues";


function App() {

   const router = createBrowserRouter([
    {path: "/", element: <Layout />, children :[
        {index: true, element: <AllIssues /> },
        {path: "open", element: <OpenIssues /> },
        {path: "closed", element: <ClosedIssues /> },
    ]}
])

  return (
     <RouterProvider router={router} /> 
  )
}

export default App
