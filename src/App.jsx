import "./index.css";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experiences from "./sections/Experiences";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import Testimonial from "./sections/Testimonials";
import { useEffect, useState } from "react";

function App() {
  const [currentBackground, setCurrentBackground] = useState("planets");

  const handleBackgroundChange = (value) => {
    setCurrentBackground(value);
  };

  const options = [
    {id: 1, value: 'planets', label: 'Planets', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 2, value: 'mountains', label: 'Mountains', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 3, value: 'forest', label: 'Forest', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 4, value: 'space', label: 'Space', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 5, value: 'city', label: 'City', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 6, value: 'beach', label: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 7, value: 'desert', label: 'Desert', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 8, value: 'underwater', label: 'Underwater', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 9, value: 'cave', label: 'Cave', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    {id: 10, value: 'volcano', label: 'Volcano', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const [apiJson, setApiJson] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/comments").then(res=>res.json()).then(data=>setApiJson(data)).then(()=>setLoading(false));
setLoading(false);
  },[]);
  console.log(apiJson);
  return (
    <>
      <Navbar
        onBackgroundChange={handleBackgroundChange}
        currentBackground={currentBackground}
      />
      <Hero currentBackground={currentBackground} />
        <div className=" max-w-8xl flex gap-10 grid grid-cols-6 px-10 py-20 ">
        {loading ? <p>Loading...</p> :
        <>
         {/* {apiJson.filter((item)=> item.name.length > 10).map((item)=> {
           return (
             <div key={item.id} className=" bg-gray-500  rounded-xl border-gray-500">
              <div className="flex flex-col  gap-2 col-span-1"> 
              <p>{item.id}</p>
              <p>{item.postId}</p>
                nameeeeeeeeee
              <p>
                {item.name.toUpperCase().charAt(1).toUpperCase() + item.name.slice(2)}</p>
              <p>{item.email}</p>
              <p>{item.body}</p>
                  
               
              </div>
            </div>  
          )
        })} */}
        </>}

        </div>
       
      <div className="container mx-auto max-w-8xl">

        <About />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
