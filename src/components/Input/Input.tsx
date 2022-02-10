import React from 'react'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value?: string
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value }) => {
  return (
    <div className="flex items-center w-full">
      {!!startAdornment && startAdornment}
      <input className="bg-transparent border border-yellow-300 border-solid focus:border-blue-500 px-4 h-10 outline-none text-sm w-full" placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </div>
  )
}

export default Input
