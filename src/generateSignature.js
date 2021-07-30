import crypto from 'crypto'

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')

  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  return Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
}

export default generateSignature
