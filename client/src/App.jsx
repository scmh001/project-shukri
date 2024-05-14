import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [array, setArray] = useState([]);


  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users")
    console.log(response.data.users);
    setArray(response.data.users)
  };


  useEffect(() => {
    fetchAPI()
  },[])


  return (
    
    <div>
      <h1>My React App</h1>
      
          {array.map((user, index) => (
            <div key={index}>
            <span>{user}</span>
            <br></br>
            </div>
          ))
        }
    </div>
  );
}

export default App;