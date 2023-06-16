import { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import './App.css'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invite/:invite" element={<InvitePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <p className="created-by">
        Created by James Ebert & Indicio 
      </p>
    </>
  )
}

const Home = () => {
  
  
  return(
    <>
      <h1>Aries Invitation Service</h1>
      <p>Learn More Soon!</p>
    </>
  )
}

const InvitePage = () => {
  const [invitation, setInvitation] = useState<string | undefined>(undefined)

  useEffect(() => {
    window.location.assign('intent://testurl/#Intent;action=android.intent.action.CONNECT;scheme=didcomm;end');
  }, [])

  let params = useParams();

  useEffect(() => {
    // const fetchInvite = async (shortInvite:string) => {
    //   const response = await fetch(`/api/invites/${shortInvite}`)
    //   // const response.
    //   console.log("response:", response)
    //   setInvitation(undefined)
    // }
    if(params.invite){
      // fetchInvite(params.invite)
      setInvitation(window.location.href)
    }
  }, [])
  return(
    <>
      <a href="intent://testurl/#Intent;action=android.intent.action.CONNECT;scheme=didcomm;end">Invite!</a>
        <p>temp gap</p>
        <a href="https://holdr.jamesebert.dev/invites/invite?oob=testvalue">iOS Invite!</a>
        {invitation && 
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={invitation}
            viewBox={`0 0 256 256`}
          />
        }
    </>
  )
}

const NotFound = () => {
  return(
    <>
      <h1>404 Not Found</h1>
    </>
  )
}

export default App
