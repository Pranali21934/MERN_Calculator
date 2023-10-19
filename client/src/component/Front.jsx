import { Link } from "react-router-dom";
import "./Front.css";
function Front(){
    return(
        <>
      <div className="screenlogin">
      <div className="leftlogin"></div>
      <div className="box">
        <div className="main-titlelogin">Hello Again!</div>
        <p className="textlogin">Welcome back, To use Calculator</p>
       
        <button className="signup" >
        <Link to='/signup'> 
        <span style={{color:"white"}}>Sign Up</span>
         </Link>
        </button>
        <button className="login" >
        <Link to='/login'>
        <span style={{color:"white"}}>Sign In</span>
        </Link>
        </button>

        {/* <button className="login1" onClick={() => loginWithRedirect()}><FcGoogle size={20} style={{paddingRight:"5px"}}></FcGoogle>Log In With Google</button>  */}
      </div>
    </div>
   
        </>
    )
}

export default Front;