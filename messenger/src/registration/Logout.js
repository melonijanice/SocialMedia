import Button from "@mui/material/Button";
import axios from "axios";
import { navigate } from "@reach/router";
export default function Logout(props) {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8000/api/users/logout", { } , { withCredentials: true })
          .then((res) => {
            //send this message to server directly
            console.log("sending data", res);
            localStorage.clear();
            if(props.isLibraryHome==="true")
            {
              navigate(`/library/home`)
            }
            else
            {navigate(`/admin/home`)}
            
          })
          .catch((err) => {
            console.log(err.response);
            //setErrors(err.response.data.errors);
          });
      };
      return (
        <div style={{textAlign:"center"}}>
    <Button  style={{textAlign:"center"}} onClick={onSubmitHandler} size="small" variant="contained">
      
    Logout
  </Button>
  </div>
)
}