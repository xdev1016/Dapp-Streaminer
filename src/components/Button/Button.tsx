import React from 'react'

const Button = ( props ) => {
  const { children,className,disabled } = props
  return (
    <button type="button" {...props} className={"bg-gray-900 hover:bg-gray-800 border-yellow-300 border border-solid text-white px-5 py-2 focus:outline-none text-sm ".concat(disabled?"cursor-not-allowed opacity-50 ":"").concat(className)}>
      {children}
    </button>
  )
}

export default Button