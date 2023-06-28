import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'

import holdrLogo from './assets/holdr-app-icon.png'
import bcWalletLogo from './assets/bcwallet-logo.png'
import trinsicLogo from './assets/trinsic-logo.png'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

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

const ConnectButton = (props: { image: string; name: string; url: string }) => {
  return (
    <a
      href={props.url}
      className="mt-3 inline-flex w-full max-w-sm items-center rounded-lg bg-white px-3 py-2 text-base font-semibold text-gray-700 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <img
        className="mr-2 inline-block h-9 w-9 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.40)]"
        src={props.image}
        alt=""
      />
      <p className="text-left">Connect using {props.name}</p>
    </a>
  )
}

const App = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col justify-between">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/invite/:inviteId" element={<InvitePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>

        <div className="my-1 w-full align-bottom">
          <p className="text-center text-sm">
            Aries Invitation Service -{' '}
            <a href="https://github.com/JamesKEbert/aries-invitation-service" className=" underline">
              Learn more
            </a>
          </p>
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

  const [copiedInvite, setCopiedInvite] = useState(false)
  const [inviteDetailsVisible, setInviteDetailsVisible] = useState(false)

  return (
    <>
      <div className="mb-6 flex w-full flex-col items-center">
        <h1 className="text-3xl font-semibold">Accept Invite</h1>
        <div className="my-5 flex w-5/6 flex-col items-center md:w-2/5">
          <ConnectButton
            image={holdrLogo}
            name={'Holdr+'}
            url={`https://holdr.jamesebert.dev/invites/invite?oob=${invitationURL}`}
          />
          <ConnectButton
            image={trinsicLogo}
            name={'Trinsic'}
            url={`https://holdr.jamesebert.dev/invites/invite?oob=${invitationURL}`}
          />
          <ConnectButton
            image={bcWalletLogo}
            name={'BC Wallet'}
            url={`https://holdr.jamesebert.dev/invites/invite?oob=${invitationURL}`}
          />
        </div>
        <button className="text-center text-sm underline">See More Wallets</button>
      </div>
      <div className="mt-2 flex w-5/6 flex-col items-center md:w-2/5">
        <button
          className="flex items-center"
          onClick={() => {
            setInviteDetailsVisible(!inviteDetailsVisible)
          }}
        >
          {inviteDetailsVisible ? (
            <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
          )}
          <h2 className="text-lg font-semibold">Invite Details</h2>
        </button>
        {inviteDetailsVisible ? (
          <>
            <QRCode className="m-4 h-auto w-7/12" value={window.location.href} viewBox={`0 0 256 256`} />
            <button
              type="button"
              className="inline-flex w-36 justify-center rounded-md bg-green-800 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => {
                await navigator.clipboard.writeText(`${window.location.href}`)
                setCopiedInvite(true)
                setTimeout(() => {
                  setCopiedInvite(false)
                }, 5000)
              }}
            >
              {copiedInvite ? 'Copied!' : 'Copy Invite URL'}
            </button>
          </>
        ) : (
          <></>
        )}
      </div>

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
