import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

function Signup() {
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
          This is blog project. you can sign up with your email and password or with Google.
        </p>
        </div>
          {/* right side */}

        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value='Your username'/>
              <TextInput
              type="text"
              placeholder="Username"
              id="username"
              />
            </div>
            <div>
              <Label value='Your Email'/>
              <TextInput
              type="text"
              placeholder="email@example.com"
              id="email"
              />
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput
              type="text"
              placeholder="Password"
              id="password"
              />
            </div>
            <Button gradientDuoTone='greenToBlue' type="submit">
              Sign up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-orange-500"s> Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
