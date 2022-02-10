import React from 'react'

const InfoItem = ( props ) => {
  const { children, className,imgSrc,label, value } = props
  return (
    <div className={"w-full rounded-xl p-4 shadow-2xl border border-solid border-yellow-300 ".concat(className)}>
      <div>
        <img src={ imgSrc } alt="Max Transaction" className="h-48 mx-auto mt-5"/>
        <div className="text-sm text-center mt-5">{ label }</div>
      </div>
      <div className="text-sm text-center mt-2">
        { children }
      </div>
    </div>
  )
}

export default InfoItem