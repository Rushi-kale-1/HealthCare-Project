export default function  DocterGrid({firstname, lastname, gender, img, medi1,medi2,medi3, exp,rating,rateqty}){
const ratingStars = rating/rateqty
    const StarRating = () => {

    }
        const stars = [];

        // Fill stars array with appropriate number of filled and unfilled stars
        for (let i = 0; i < 5; i++) {
            if (i < ratingStars) {
                stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>); // Filled star
            } else {
                stars.push(<i key={i} className="far fa-star text-gray-400"></i>); // Unfilled star
            }
        }

    return <>
    <div className=' px-3 py-2 shadow-md rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 '>
        <div className='ml-3 my-4 flex justify-start'>
            <div className='mr-5'>
                <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://images.pexels.com/photos/19990334/pexels-photo-19990334/free-photo-of-close-up-of-yellow-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

                />

            </div>
            <div>
                <span  className='text-gray-600 font-semibold text-md'> Dr. {firstname} {lastname}</span> <br/>
                <span className='font-sans text-gray-600'>{gender}</span>
            </div>
        </div>

        <div className='ml-3 my-4 '>

        <div className='my-1 font-semibold text-gray-600'> Degrees:<span className='font-sans '> {medi1} {medi2} {medi3}</span></div>
            <div>  Experience: {exp}</div>

        </div>
        <div className='my-1 flex justify-center'>

            <div> {ratingStars}  {stars} ({rateqty})</div>
        </div>
    </div>
    </>
}