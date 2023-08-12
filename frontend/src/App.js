import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import ChatProvider from "./store/context";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "chat", element: <Chatpage /> },
  ]);
  return (
    <RouterProvider router={router}>
      </RouterProvider>
  );
}

export default App;
