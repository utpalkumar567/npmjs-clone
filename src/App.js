import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Searchpage from "./components/Searchpage";
import Header from "./components/Header";
import Body from "./components/Body"; // Assuming Body will use Outlet for nested routing
import Modulepage from "./components/Modulepage";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

// Creating the router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <Banner /> },
      {
        path: "search",
        element: <Searchpage />,
      },
      {
        path: "package/*",
        element: <Modulepage />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={appRouter} />
      <Footer />
    </div>
  );
}

export default App;
