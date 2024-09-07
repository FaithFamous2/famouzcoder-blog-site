import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import Oauth from "../components/Oauth.jsx";

function Signin() {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const[loading, setLoading] = useState(false);
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
   setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData)
  const handleSubmit= async(e) => {
    e.preventDefault();
    if (!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
    });
    const data =  await res.json();
      if(data.success === false){
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
        <Link to="/"className="font-bold dark:text-white text-4xl">
        <span className="ps-2 py-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 rounded-lg text-white"> Famouzcoder</span>
            Blog
        </Link>
        <p className="text-sm mt-5">
          This is blog project. you can sign in with your email and password or with Google.
        </p>
        </div>
          {/* right side */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email'/>
              <TextInput
              type="email"
              placeholder="email@example.com"
              id="email"
              onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput
              type="password"
              placeholder="********"
              id="password"
              onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='greenToBlue' type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
            <Oauth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Dont Have an account?</span>
            <Link to='/sign-up' className="text-orange-500"s> Sign Up</Link>
          </div>
          {errorMessage && (
              <Alert className="mt-5" color="failure">
              {errorMessage}
              </Alert>

          )}
        </div>
      </div>
    </div>
  )
}

export default Signin
