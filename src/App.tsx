import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { BrowserRouter, Route, Routes, useParams, useSearchParams } from 'react-router-dom'

import holdrLogo from './assets/holdr-app-icon.png'
import bcWalletLogo from './assets/bcwallet-logo.png'
import trinsicLogo from './assets/trinsic-logo.png'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { isAndroid, isIOS } from 'react-device-detect'

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
              <Route path="/invite" element={<InvitePage />} />
              <Route path="/invite/:inviteId" element={<ShortURLInvitePage />} />
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

const IOSAppConnectList = (props: { base64Invite: string }) => {
  return (
    <div className="my-5 flex w-5/6 flex-col items-center md:w-2/5">
      <ConnectButton
        image={holdrLogo}
        name={'Holdr+'}
        url={`https://holdr.jamesebert.dev/invites/invite?oob=${props.base64Invite}`}
      />
      <ConnectButton
        image={trinsicLogo}
        name={'Trinsic'}
        url={`https://holdr.jamesebert.dev/invites/invite?oob=${props.base64Invite}`}
      />
      <ConnectButton
        image={bcWalletLogo}
        name={'BC Wallet'}
        url={`https://holdr.jamesebert.dev/invites/invite?oob=${props.base64Invite}`}
      />
      <button className="mt-6 text-center text-sm underline">See More Wallets</button>
    </div>
  )
}

const AndroidConnectContainer = (props: { deepLinkURL: string }) => {
  return (
    <div className="my-5 flex w-5/6 flex-col items-center md:w-2/5">
      <a
        href={props.deepLinkURL}
        className="inline-flex justify-center rounded-md bg-green-800 px-2 py-2 font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Connect on Android
      </a>
    </div>
  )
}

const InvitationDetails = () => {
  const [copiedInvite, setCopiedInvite] = useState(false)

  return (
    <>
      <QRCode
        className="m-4 h-auto w-7/12 sm:w-4/12 md:w-3/12 xl:w-2/12"
        value={window.location.href}
        viewBox={`0 0 256 256`}
      />
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
  )
}

const InviteDisplay = (props: { base64Invite: string }) => {
  const deepLinkURL = `intent://invite?oob=${props.base64Invite}#Intent;action=android.intent.action.VIEW;scheme=didcomm;end`
  // Attempt to effectively immediately launch Android Intent
  useEffect(() => {
    if (isAndroid && props.base64Invite) {
      console.log('On Android, attempting to immediately open a wallet via Android Intent')
      window.location.assign(deepLinkURL)
    }
  }, [props.base64Invite])

  const [inviteDetailsVisible, setInviteDetailsVisible] = useState(false)

  // Android / IOS Display
  if (isAndroid || isIOS) {
    return (
      <>
        <div className="mb-6 flex w-full flex-col items-center">
          <h1 className="text-center text-3xl font-semibold">Accept Invite</h1>
          {/* TODO: Loading spinner based off of invitation loaded can elimnate the '||' here: */}
          {isIOS && <IOSAppConnectList base64Invite={props.base64Invite} />}
          {isAndroid && <AndroidConnectContainer deepLinkURL={deepLinkURL} />}
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
          {inviteDetailsVisible ? <InvitationDetails /> : <></>}
        </div>
      </>
    )
    // Default Display / Computer Display
  } else {
    return (
      <>
        <div className="mb-6 flex w-full flex-col items-center">
          <h1 className="text-center text-4xl font-bold">Accept Invite</h1>
          <InvitationDetails />
        </div>
        <p className="text-center">You've been invited to connect</p>
        <p className="text-center">Scan the QR Code using your mobile device</p>
      </>
    )
  }
}

enum PageState {
  Loading,
  Error,
  NoInvitationFound,
  ContentDisplay,
}

/**
 * Invite Page, URL shortening, relies on having an API to query invite ids against
 */
const ShortURLInvitePage = () => {
  const [base64Invite, setBase64Invite] = useState<string | undefined>(undefined)
  const [pageState, setPageState] = useState<PageState>(PageState.Loading)

  let params = useParams()

  useEffect(() => {
    // URL Shortening -- fetch JSON invitation using shortened url (inviteId)
    const fetchInvite = async (inviteId: string | undefined) => {
      try {
        if (!inviteId) {
          throw new Error('No InviteId provided')
        }

        // Note -- For URL shortening, we need /invite/{inviteId} to return a web page, but when requesting JSON content, we need to return the Invitation JSON. In order to accomplish this when using Vercel for the API, the usage of filtering the header via 'has' does not work in development: "Using has does not yet work locally while using vercel dev, but does work when deployed.". So, when in development we manually route to the api that the 'has' functionality would provide. Learn more here: https://vercel.com/docs/concepts/projects/project-configuration#rewrites
        const apiRoute = `${import.meta.env.DEV ? '/api' : ''}/invite/${inviteId}`
        console.log('Getting Invitation', { apiRoute, inviteId })
        const response = await fetch(apiRoute, {
          headers: {
            Accept: 'application/json',
          },
        })

        if (response.status === 404) {
          console.warn(`No Invitation Found for inviteID ${inviteId}`)
          setPageState(PageState.NoInvitationFound)
        } else {
          const invitationJSON = JSON.stringify(await response.json())
          // Base64 Stringify invitation JSON
          const invitationBase64 = btoa(invitationJSON)

          setBase64Invite(invitationBase64)
          console.log('Base64 Invite:', invitationBase64)
          setPageState(PageState.ContentDisplay)
        }
      } catch (error) {
        console.warn('Error fetching invitation', error)
        setPageState(PageState.Error)
      }
    }
    fetchInvite(params.inviteId)
  }, [])

  switch (pageState) {
    case PageState.ContentDisplay:
      if (base64Invite) {
        return <InviteDisplay base64Invite={base64Invite} />
      }
    case PageState.Error:
      return <p>Error display invite, please try again</p>
    case PageState.NoInvitationFound:
      return <p>Error, no invite found </p>
    case PageState.Loading:
    // TODO: Improve Loading UI
    default:
      return <p>Loading Invite...</p>
  }
}

/**
 * Invite Page, no URL shortening, relies on having a oob query parameter in the url
 */
const InvitePage = () => {
  let [searchParams] = useSearchParams()
  const oobQuery = searchParams.get('oob')
  console.log('Base64 Invite:', oobQuery)

  if (oobQuery) {
    return <InviteDisplay base64Invite={oobQuery} />
  } else {
    console.warn('OOB query parameter does not exist')
    return <p>Something went wrong, please try again</p>
  }
}

const NotFound = () => {
  return (
    <>
      <h1>404 Not Found</h1>
    </>
  )
}

export default App
