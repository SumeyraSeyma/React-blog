import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';

function header() {
  return (
    <header className='sticky top-0 z-10 mx-auto bg-white/75 backdrop-blur-lg dark:bg-zinc-950/75'>
      <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0'>
        <div className='flex'>
        <FontAwesomeIcon
          className='size-10'
          icon={faCanadianMapleLeaf}
          id='logo'
        />
      <a href={`/`} className='italic text-cyan-400 text-3xl font-bold  decoration-blue-50 hover:decoration-blue-50'>Our Blue Marble</a>
      </div>
      <span className="relative hidden text-lg tracking-wide text-zinc-500 dark:text-zinc-200 md:flex">Thoughts and images from our amazing planet.</span>
    </div>
    </header>
  )
}

export default header