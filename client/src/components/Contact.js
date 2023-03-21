import React, {useEffect, useState} from 'react'

const Contact = () => {

    // const history = useNavigate();
   const [userData, setUserData] = useState({name:"", email:"",phone:"", message:""});

  const userContact = async()=>{
    try {
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          "content-Type":"application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      
      setUserData({...userData, name:data.name, email: data.email, phone:data.phone});

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
    //   history('/login');
    }
  }

  useEffect(() => {
      
      userContact();
  }, [])

  //storing data in states
  const handleInputs = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value})
  }

  //send data to backend
  const contactForm = async(e)=>{
    e.preventDefault(); //behaviour which will auto refresh

    const {name, email, phone, message} = userData; //object destructuring

    const res = await fetch('/contact',{
        method:"POST",
        headers:{
            // "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,email,phone, message
        })
    });
    const data = await res.json();

    if(!data){
        console.log("Message not send");
    }else{
        alert("Message send successfully");
        setUserData({...userData,message:""})
    }
  }

  return (
    <>
      <div className="container contact-form">
            <div className="contact-image">
                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
            </div>
            <form method="post">
                <h3>Drop Us a Message</h3>
               <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" 
                            value={userData.name}
                            onChange={handleInputs}
                            placeholder="Your Name *" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="email" className="form-control" 
                            value={userData.email}
                            onChange={handleInputs}
                            placeholder="Your Email *" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="phone" className="form-control" 
                            value={userData.phone}
                            onChange={handleInputs}
                            placeholder="Your Phone Number *" />
                        </div>
                        <div className="form-group">
                            <input type="submit" name="btnSubmit" className="btnContact" 
                            onClick={contactForm}
                            value="Send Message" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <textarea name="message" className="form-control" 
                            value={userData.message}
                            onChange={handleInputs}
                            placeholder="Your Message *"></textarea>
                        </div>
                    </div>
                </div>
            </form>
</div>
    </>
  )
}

export default Contact