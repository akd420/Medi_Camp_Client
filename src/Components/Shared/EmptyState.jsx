/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import CustomButton from './CustomButton'
const EmptyState = ({ message, address, content }) => {
  return (
    <div className='h-screen gap-5 flex flex-col justify-center items-center pb-16 '>
      <p className='text-gray-600 text-xl lg:text-3xl'>{message}</p>
      <Link to={address}>
        <CustomButton content={content} />
      </Link>
    </div>
  )
}

export default EmptyState