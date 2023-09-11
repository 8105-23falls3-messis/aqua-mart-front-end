import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="register">
    <div className="register__warpper">
      <div className="register__title">
          <h2>Create an account</h2>
      </div>
      <div>
          <label>Name:</label>
          <input type="text" />
      </div>
      <div>
          <label>Phone:</label>
          <input type="phone" />
      </div>
      <div>
          <label>Emial:</label>
          <input type="text" />
      </div>
      <div>
          <label>Company(Opt):</label>
          <input type="text" />
      </div>
      <div>
          <label>Address:</label>
          <input type="text" />
      </div>
      <div>
          <label>Password:</label>
          <input type="password" />
      </div>
      <div>
          <label>Re-Type Password:</label>
          <input type="password" />
      </div>
      <Link to={'/'}>
      <button>Sign Up</button>
      </Link>
      <Link to={'/login'}>
      <a>Sign In</a>
      </Link>
    </div>
  </div>
  )
}

export default Register