# Aries Invitation Service

Why use this strategy instead of just using traditional deep links completely?
Primary benefits:

- One device workflows
- Able to use regular camera
- Platform agnostic
- Open source first
- URL shortening - shorter/better urls for users / better user experience
- intent://invite?oob=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9vdXQtb2YtYmFuZC8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiNTk2YzRjZTItNWI0MS00MmY1LWE0ZWEtYzc5NjdhNGEzN2RkIiwgImhhbmRzaGFrZV9wcm90b2NvbHMiOiBbImRpZDpzb3Y6QnpDYnNOWWhNcmpIaXFaRFRVQVNIZztzcGVjL2Nvbm5lY3Rpb25zLzEuMCJdLCAic2VydmljZXMiOiBbeyJpZCI6ICIjaW5saW5lIiwgInR5cGUiOiAiZGlkLWNvbW11bmljYXRpb24iLCAicmVjaXBpZW50S2V5cyI6IFsiZGlkOmtleTp6Nk1rcUdQRDJZTDZXTXFRU251a0NxVDhoSDg2cTY4ZWJOcnJhR25VR2pMR1BVTkEiXSwgInJvdXRpbmdLZXlzIjogWyJkaWQ6a2V5Ono2TWtvMXRSYjZTS041Q1B1OTl5a2lRTU5abTh2VWNKZHlQU0JqNno4VUZTcVV1WiIsICJkaWQ6a2V5Ono2TWtmZlJEZ2JoNkdMTDV6QVhqaHI2MWMxd0hlVDlNNHpwTGFTUUJ5UVF2cWpDVCJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vcHJvdmVuLm1lZGlhdG9yLmluZGljaW90ZWNoLmlvIn1dLCAibGFiZWwiOiAiUHJvdmVuIn0=#Intent;action=android.intent.action.VIEW;scheme=didcomm;end
- didcomm://invite?oob=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9vdXQtb2YtYmFuZC8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiNTk2YzRjZTItNWI0MS00MmY1LWE0ZWEtYzc5NjdhNGEzN2RkIiwgImhhbmRzaGFrZV9wcm90b2NvbHMiOiBbImRpZDpzb3Y6QnpDYnNOWWhNcmpIaXFaRFRVQVNIZztzcGVjL2Nvbm5lY3Rpb25zLzEuMCJdLCAic2VydmljZXMiOiBbeyJpZCI6ICIjaW5saW5lIiwgInR5cGUiOiAiZGlkLWNvbW11bmljYXRpb24iLCAicmVjaXBpZW50S2V5cyI6IFsiZGlkOmtleTp6Nk1rcUdQRDJZTDZXTXFRU251a0NxVDhoSDg2cTY4ZWJOcnJhR25VR2pMR1BVTkEiXSwgInJvdXRpbmdLZXlzIjogWyJkaWQ6a2V5Ono2TWtvMXRSYjZTS041Q1B1OTl5a2lRTU5abTh2VWNKZHlQU0JqNno4VUZTcVV1WiIsICJkaWQ6a2V5Ono2TWtmZlJEZ2JoNkdMTDV6QVhqaHI2MWMxd0hlVDlNNHpwTGFTUUJ5UVF2cWpDVCJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vcHJvdmVuLm1lZGlhdG9yLmluZGljaW90ZWNoLmlvIn1dLCAibGFiZWwiOiAiUHJvdmVuIn0=

### TODO:

- [ ] Investigate Android Deep Linking default choice determination mechanism (James)
- [ ] App search mechanism (once a large number of apps have been registered)
- [ ] App list file configuration
  - [ ] External Hosting of app list file -- didcomm.org ?
- [ ] Device detection could use additional testing against a variety of devices to determine edge cases and provide appropriate backup behaviors
- [ ] Detect an invalid URL and display an appropriate page
- [ ] Loading Spinner while fetching invitation in shortened URL mode
- [ ] Determine if we want to and if so update the URL Shortening RFC behavior
- [ ] (Low Urgency) React Strict Mode in dev mode causes Network error on Androids by attempting to navigate to deep link/android intent twice

## Android Intents

Android Intents work on all the mobile browsers, some browsers will automatically prompt the user instead of requiring a button click on the website (which is preferred):

- [ ] Android Chrome (if only one app is installed matching the scheme or if a specific package/app is defined, Android Chrome will prompt the user)
- [x] Firefox
- [ ] Opera
- [x] Edge

## iOS Universal Links

### Notes:

If the user clicks the link and the app is not installed, the user will be directed to the website, not the app. This likely indicates the app owner should host a webpage providing instructions to install their app.

Will need to handle the case where the browser displays a banner if a user is just on the website and a user clicks on it--this likely should result in a "invite invalid" display or something of that nature.

iOS development -- can append mode query to not require it to use Apple CDN: `?mode=developer`
