import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-400 justify-center items-center rounded-tl-4xl rounded-br-4xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Want to learn about how to code?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resource with famouzcoder Programing project
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none'>
                <a href='https://www.famouzcoder.com' target='_blank' rel='noopener noreferrer'>
                Famouzcoder project
                </a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://static.vecteezy.com/system/resources/previews/002/099/443/non_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg" alt='image' />
        </div>
    </div>
  )
}

export default CallToAction
