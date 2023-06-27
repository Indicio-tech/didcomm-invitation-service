import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'

import holdrLogo from './assets/holdr-app-icon.png'
import bcWalletLogo from './assets/bcwallet-logo.png'

// const ConnectButton = (props: { image: string; name: string }) => {
//   return (
//     <a
//       href="#"
//       className="flex items-center justify-start overflow-hidden rounded-md bg-gray-700 pr-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//     >
//       <div className="h-full bg-gray-500 px-3 py-3">
//         <img className="inline-block h-8 w-8 rounded-lg" src={props.image} alt="" />
//       </div>
//       <div className="px-3 py-3">Connect using {props.name}</div>
//     </a>
//   )
// }

// const ConnectButton = (props: { image: string; name: string }) => {
//   return (
//     <a
//       href="#"
//       className="flex items-center justify-start overflow-hidden rounded-md border-2 border-gray-700 bg-gray-700 pr-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//     >
//       <div className="h-full rounded-md bg-gray-50 px-2 py-2">
//         <img className="inline-block h-9 w-9 rounded-full" src={props.image} alt="" />
//       </div>
//       <div className="px-3 py-3">Connect using {props.name}</div>
//     </a>
//   )
// }

const ConnectButton = (props: { image: string; name: string }) => {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center rounded-lg bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <img
        className="mr-2 inline-block h-9 w-9 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.40)]"
        src={props.image}
        alt=""
      />

      <p>Connect using {props.name}</p>
    </button>
  )
}

const App = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col justify-between">
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-5/6 bg-white md:w-2/5">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                aria-hidden="true"
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-white px-5 py-3 text-center text-base font-medium text-white hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-400"
            >
              Learn more
            </a>
            {/* <button
              type="button"
              className="inline-flex w-full items-center rounded-lg bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <img className="mr-2 inline-block h-8 w-8 rounded-full" src={holdrLogo} alt="" />
              <p>Connect using Holdr+</p>
            </button> */}
            <div className="mt-6">
              <ConnectButton image={holdrLogo} name={'Holdr+'} />
            </div>
            <div className="mt-6">
              <ConnectButton image={bcWalletLogo} name={'BC Wallet'} />
            </div>
          </div>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invite/:inviteId" element={<InvitePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div className="w-full align-bottom">
          <p className="text-sm">Created by James Ebert & Indicio</p>
        </div>
      </div>
    </>
  )
}

const Home = () => {
  return (
    <>
      <h1>Aries Invitation Service</h1>
      <p>Learn More Soon!</p>
    </>
  )
}

const launchAndroidIntent = (invitationURL: string) => {
  window.location.assign(
    `intent://invite?oob=${invitationURL}#Intent;action=android.intent.action.VIEW;scheme=didcomm;end`,
  )
}

const InvitePage = () => {
  const [invitationJSON, setInvitationJSON] = useState<string | undefined>(undefined)
  const [invitationURL, setInvitationURL] = useState<string | undefined>(undefined)

  let params = useParams()

  useEffect(() => {
    console.log('Invitation JSON', invitationJSON)
    console.log('Invitation Base64 URL', invitationURL)
  }, [invitationJSON, invitationURL])

  useEffect(() => {
    const fetchInvite = async (inviteId: string) => {
      const response = await fetch(`/invite/${inviteId}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      const invitationJSON = JSON.stringify(await response.json())
      setInvitationJSON(invitationJSON)

      const invitationBase64 = btoa(invitationJSON)
      setInvitationURL(invitationBase64)

      // Attempt to effectively immediately launch Android Intent
      launchAndroidIntent(invitationBase64)
    }
    if (params.inviteId) {
      fetchInvite(params.inviteId)
    }
  }, [])

  return (
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
  return (
    <>
      <h1>404 Not Found</h1>
    </>
  )
}

export default App
