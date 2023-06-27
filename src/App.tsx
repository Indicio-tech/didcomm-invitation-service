import { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-between'>
        <div className='w-full h-full justify-center items-center flex'>
          <div className='w-4/5 h-96 bg-slate-600'></div>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invite/:inviteId" element={<InvitePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div className="w-full align-bottom">
          <p className="text-sm">
            Created by James Ebert & Indicio 
          </p>
        </div>
      </div>
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

const launchAndroidIntent = (invitationURL: string) => {
  window.location.assign(`intent://invite?oob=${invitationURL}#Intent;action=android.intent.action.VIEW;scheme=didcomm;end`);
}

const InvitePage = () => {
  const [invitationJSON, setInvitationJSON] = useState<string | undefined>(undefined)
  const [invitationURL, setInvitationURL] = useState<string | undefined>(undefined)

  let params = useParams();

  useEffect(() => {
    console.log("Invitation JSON", invitationJSON)
    console.log("Invitation Base64 URL", invitationURL)
  }, [invitationJSON, invitationURL])

  useEffect(() => {
    const fetchInvite = async (inviteId:string) => {
      const response = await fetch(`/invite/${inviteId}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      const invitationJSON = JSON.stringify(await response.json())
      setInvitationJSON(invitationJSON)

      const invitationBase64 = btoa(invitationJSON)
      setInvitationURL(invitationBase64)

      // Attempt to effectively immediately launch Android Intent
      launchAndroidIntent(invitationBase64)
    }
    if(params.inviteId){
      fetchInvite(params.inviteId)
    }
  }, [])

  return(
    <>
      
      {/* <div className='w-full flex flex-wrap'>
        <h1 className='align-text-'>WelcomeWelcomeWelcomeWelcomeWelcomeWelcome</h1>
        <h1 className='align-text-top'>HelloHelloHelloHelloHelloHelloHello</h1>
      </div>
      <a href={`intent://invite?oob=${invitationURL}#Intent;action=android.intent.action.VIEW;scheme=didcomm;end`}>Invite!</a>
        <p>temp gap</p>
        <a href={`https://holdr.jamesebert.dev/invites/invite?oob=${invitationURL}`}>iOS Invite!</a>
        {invitationJSON && 
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={window.location.href}
            viewBox={`0 0 256 256`}
          />
        } */}
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
