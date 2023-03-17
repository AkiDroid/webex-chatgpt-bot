const readline = require('readline')

const inter = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = async function qeuryChatGPT(content) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAIKEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content
      }]
    }),
  })
  const data = await resp.json()
  try {
    return data.choices[0].message?.content
  } catch (e) {
    return 'Query error'
  }
}