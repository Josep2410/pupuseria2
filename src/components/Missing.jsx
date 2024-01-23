import React from 'react'
import {Link} from 'react-router-dom'

export default function Missing() {
  return (
    <div className="missingPage">
      <h3>404 Error</h3>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found or has been removed.</p>
      <Link to="/home"><button>Go to Home</button></Link>
    </div>
  )
}
