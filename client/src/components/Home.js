import React, { useEffect,useState } from 'react'

const Home = () => {

  const[userName, setUserName] = useState('');
  const[show, setShow] = useState(false);

  const userHomePage = async()=>{
    try {
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          "content-Type":"application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    userHomePage();
  }, [])


  return (
    <div>
        <p>WELCOME</p>
        <h1>{userName}</h1>
        <p>{show ? 'Happy to see you back' :'This is the home page'}</p>
    </div>
  )
}

export default Home