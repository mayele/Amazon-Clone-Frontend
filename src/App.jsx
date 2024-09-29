import { useContext, useEffect, useState } from "react";

// import "./App.css";
// import Header from "./Components/Header/Header";
// import CarouselEffect from "./Components/Carousel/CarouselEffect";
// import Category from "./Components/Category/Category";
// import Product from "./Components/Product/Product";
import Routing from "./Components/Routing";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  // const [count, setCount] = useState(0);

  const [{user},dispatch]=useContext(DataContext)
 useEffect(() => {
   auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      dispatch({
        type:Type.SET_USER,
        user:authUser
      })
    }else{
       dispatch({
         type: Type.SET_USER,
         user: null,
       });
    }
   })
 
   return () => {
     
   }
 }, [])
 

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
