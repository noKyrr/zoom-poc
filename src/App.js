import React, { useState } from 'react'

import { ZoomMtg } from '@zoomus/websdk'
import generateSignature from './generateSignature'

// Library version must be the same as package.json
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.7/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const role = 0

function App() {
  // Meeting number generated when creating the meeting
  const [meetingNumber, setMeetingNumber] = useState('')
  const [userName, setUserName] = useState('')

  const onStartMeeting = async () => {
    const signature = await generateSignature(
      process.env.REACT_APP_ZOOM_API_KEY,
      process.env.REACT_APP_ZOOM_API_SECRET,
      meetingNumber,
      role
    )

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: window.location.href,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: String(meetingNumber).replace(/\s/g, ''),
          userName: userName,
          apiKey: process.env.REACT_APP_ZOOM_API_KEY,
          userEmail: 'userEmail', // Not requirer
          passWord: 'userPassWord', // Not required
          tk: '',
        })
      },
    })
  }

  return (
    <main>
      <h1>Type required fields</h1>
      <div className="fieldset">
        <div>
          <label>Meeting number (required)</label>
        </div>
        <input
          placeholder="Meeting number"
          value={meetingNumber}
          onChange={(e) => setMeetingNumber(e.target.value)}
        />
      </div>
      <div className="fieldset">
        <div>
          <label>User Name (required)</label>
        </div>
        <input
          placeholder="User name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      {meetingNumber && userName && (
        <div>
          <button onClick={() => onStartMeeting()}>Join Meeting</button>
        </div>
      )}
    </main>
  )
}

export default App
