import { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import './App.css'

function App() {
  // Retrieve URL Params
  const queryParameters = new URLSearchParams(window.location.search)
  const c_iQuery = queryParameters.get("c_i")
  const oobQuery = queryParameters.get("oob")

  const [invitation, setInvitation] = useState<string | undefined>(undefined)

  useEffect(() => {
    if(oobQuery){
      setInvitation(oobQuery)
    }
    else if(c_iQuery){
      setInvitation(c_iQuery)
    }
  }, [c_iQuery, oobQuery])

  useEffect(() => {
    window.location.assign('intent://testurl/#Intent;action=android.intent.action.CONNECT;scheme=didcomm;end');
  }, [])
  

  return (
    <>
      <h1>Aries Invitation Service</h1>
      <a href="intent://testurl/#Intent;action=android.intent.action.CONNECT;scheme=didcomm;end">Invite!</a>
      {invitation && 
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={invitation}
          viewBox={`0 0 256 256`}
        />
      }
      <p className="created-by">
        Created by James Ebert & Indicio 
      </p>
    </>
  )
}

export default App
