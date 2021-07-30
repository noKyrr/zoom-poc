import React, { useState } from 'react'

import { ZoomMtg } from '@zoomus/websdk'
import generateSignature from './generateSignature'

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.7/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const role = 0

function App() {
  const [meetingNumber, setMeetingNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassWord, setUserPassWord] = useState('')

  const onStartMeeting = async () => {
    const signature = await generateSignature(
      process.env.REACT_APP_ZOOM_API_KEY,
      process.env.REACT_APP_ZOOM_API_SECRET,
      meetingNumber,
      role
    )

    document.getElementById('zmmtg-root').style.display = 'block'

    alert(String(meetingNumber).replace(/\s/g, ''))

    ZoomMtg.init({
      leaveUrl: window.location.href,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: String(meetingNumber).replace(/\s/g, ''),
          userName: userName,
          apiKey: process.env.REACT_APP_ZOOM_API_KEY,
          userEmail: userEmail,
          passWord: userPassWord,
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
      <div className="fieldset">
        <div>
          <label>User e-mail</label>
        </div>
        <input
          placeholder="User email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div className="fieldset">
        <div>
          <label>User password</label>
        </div>
        <input
          placeholder="User Password"
          value={userPassWord}
          onChange={(e) => setUserPassWord(e.target.value)}
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
