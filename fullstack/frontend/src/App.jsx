import { useState ,useEffect } from 'react'
import axios from 'axios'
import './App.css'




function App() {
  
  const [jokes,setjokes] = useState([]);

function callApi(){
  // use proxy hare in vite.comfig.js file
  fetch('/api/jokes')
  .then((response)=>{ return response.json() })
  .then((data) =>{return setjokes(data)})
  .catch((err)=> console.log(err ," error error "))
}



useEffect(()=>{
  callApi()

//   axios.get(`/api/jokes`)
//   .then((response)=>{
//     setjokes(response.data)
//   }
// )
//   .catch((error) => {
//     console.log(error,'error error')
//   }
// )

},[])

  return (
    <>
     <h1>hello </h1>
     <p>jokes : {jokes.length}</p>

     {jokes.map((joke,index)=>{ return <div key={index}>
        {/* <h1>{joke.id}</h1> */}
        {console.log(joke.id)}
        <h2>{joke.title}</h2>
        <p>{joke.content}</p>
      </div>
     })}
    </>
  )
}

export default App
