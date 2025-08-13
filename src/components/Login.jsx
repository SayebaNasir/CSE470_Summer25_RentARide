import React, { useState, useEffect, useRef } from 'react'

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const firstInputRef = useRef(null) // for autofocus

  useEffect(() => {
    // Auto-focus first available input when modal opens
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [state])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log({ name, email, password })
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowLogin(false) // close only on background click
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()} // prevent background click
        className="flex flex-col gap-4 w-80 sm:w-[352px] p-8 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          {state === "login" ? "Vroom Into Your Next Adventure!" : "Sign Up"}
        </p>

        {state === "register" && (
          <input
            ref={state === "register" ? firstInputRef : null}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            className="border border-gray-200 rounded w-full p-2 outline-pink-500"
            type="text"
            required
          />
        )}

        <input
          ref={state === "login" ? firstInputRef : null}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="border border-gray-200 rounded w-full p-2 outline-pink-500"
          type="email"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="border border-gray-200 rounded w-full p-2 outline-pink-500"
          type="password"
          required
        />

        <p className="text-sm">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-pink-500 cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-pink-500 cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          className="bg-pink-500 hover:bg-pink-600 transition-all text-white w-full py-2 rounded-md"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
