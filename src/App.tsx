import './App.css'

function App() {
  // Retrieve URL Params
  const queryParameters = new URLSearchParams(window.location.search)
  const c_iQuery = queryParameters.get("c_i")
  const oobQuery = queryParameters.get("oob")


  return (
    <>
      <h1>Aries Invitation Service</h1>
      <p className="created-by">
        Created by James Ebert & Indicio
      </p>
    </>
  )
}

export default App
