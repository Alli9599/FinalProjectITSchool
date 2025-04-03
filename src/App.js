import Page404 from "./pages/Page404";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NewsDetails from "./pages/NewsDetails";
import NewsCategory from "./pages/NewsCategory";
  import Favorites from "./pages/Favorites";
import { useReducer } from "react";
import { favoritesReducer, initialState } from "./store/favorites/reducer";
import { FavoritesContext } from "./store/favorites/context";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

// Definim rutele necesare aplicatiei 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Page404/>
  }, {
    path: "/news/:newsId",
    element: <NewsDetails />
  }, {
    path:"/category/:categoryId",
    element: <NewsCategory />
  }, {
    path: "/favorites",
    element: <Favorites />
  }
]);

function App() {
  // PAS 1:Initializam reducer-ul pentru produse favorite - folosind hook-ul useReducer care are nevoie de un state initial si reducerul care modifica state-ul
  const [initialLocalStorageState] = useLocalStorage("favorites" , initialState);
  const [ favoritesState, favoritesDispatch] = useReducer (favoritesReducer, initialLocalStorageState);

  // PAS 2: Ne mai trebuie obiectul ce va contine valoarea contextului
  const favoritesContextValue = {favoritesState, favoritesDispatch}


  return (
    <div className="App">
      {/*Pasam state-ul global si dispatch-ul catre intreaga aplicatie */}
      <FavoritesContext.Provider value={favoritesContextValue}>
      {/* Adaugam providerul de rutare - necesar pentru a sti react-ul ce rute avem in aplicatie */}
      <RouterProvider router={router} />
      </FavoritesContext.Provider>
    </div>
  );
}

export default App;
