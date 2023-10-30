import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  // useState : to update the value dynamically

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setChararcterAllowed] = useState(false)

  // useCallback : to optimised the components. stores the prev state in cache memory

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*(){}~`"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed])

  // useEffect : to run the passwordgenerator function when there is any change in given dependencies.

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  // useRef : provides refernces of the given component

  const passwordRef = useRef(null)

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <div className='h-screen w-screen bg-black py-40'>
      <div className='w-full max-w-md mx-auto bg-blue-400 rounded-lg p-5'>
        <h1 className='text-center text-3xl mb-5 text-black'>Password Generator</h1>
        <div className='flex rounded-lg mx-5'>

          {/* input Field */}

          <input
            type="text"
            placeholder='Password'
            value={password} readOnly
            ref={passwordRef}
            className='w-full py-1 px-3 rounded' />

          {/* copy button */}

          <button
            className='bg-blue-700 text-white px-2 rounded-lg ml-2 active:bg-blue-500'
            onClick={copytoclipboard}>Copy</button>
        </div>
        <div className='flex space-x-3 mt-4'>

          {/* length slider */}

          <input
            type="range"
            min={8} max={100}
            value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label>Length:{length}</label>

          {/* number checkbox */}

          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => { setNumberAllowed((prev) => !prev) }} />
          <label>Numbers</label>

          {/* character checkbox */}

          <input
            type="checkbox"
            defaultChecked={characterAllowed}
            onChange={() => { setChararcterAllowed((prev) => !prev) }} />
          <label>Charaters</label>
        </div>
      </div>
    </div>

  )
}

export default App
