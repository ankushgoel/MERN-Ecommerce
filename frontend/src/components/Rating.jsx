import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({value, text}) => {
  return (
    <div className='rating'>
        {[...Array(5)].map((e, i) => <span key={i}>
            {value >= (i + 1) ? <FaStar /> : value >= (i + 0.5) ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>)}
        <span className="rating-text">{text}</span>
    </div>
  )
}

export default Rating