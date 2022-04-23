const crypto = require('crypto')
const fs = require('fs')

const encrypt_with_public_key = (public_key, message) => {
  // Creating buffer from a string to potentially send it through the network
  // since TCP protocol accepts only binary data in form of Buffers
  const buffer_message = Buffer.from(message, 'utf8')

  return crypto.publicEncrypt(public_key, buffer_message)
}

const decrypt_with_private_key = (private_key, message) => {
  return crypto.privateDecrypt(private_key, message)
}

const public_key = fs.readFileSync(`${__dirname}/id_rsa_pub.pem`, 'utf8')
const private_key = fs.readFileSync(`${__dirname}/id_rsa_priv.pem`, 'utf8')

const encrypted_message = encrypt_with_public_key(public_key, 'Super secret man')
const decrypted_message = decrypt_with_private_key(private_key, encrypted_message)

console.log(decrypted_message.toString())
