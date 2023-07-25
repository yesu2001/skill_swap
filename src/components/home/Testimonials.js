import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, auth } from "../../firebase/firebaseConfig";
import { fetchReviews, addReview } from "../../reducer/reviewsSlice";
import { getCurrentDateFormatted } from "../../helper/getTodayDate";
import { fetchUserDetails } from "../../reducer/userDetailsSlice";

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.data);
  // Create a ref for the textarea to focus on when the modal opens
  const textareaRef = useRef(null);
  const currentUser = auth.currentUser;
  const currentUserId = currentUser?.uid;
  const profileData = useSelector((state) => state.userDetails.data);

  useEffect(() => {
    // Fetch user details on component load
    dispatch(fetchUserDetails(currentUserId));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    // Fetch reviews on component mount
    dispatch(fetchReviews());
  }, [dispatch, reviews]);

  useEffect(() => {
    // Set focus on the textarea when the modal opens
    if (isModalOpen) {
      textareaRef.current.focus();
    }
  }, [isModalOpen]);

  const handleAddReview = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReviewText("");
    setRating(0);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return; // Ensure the user is logged in.
      const currentDate = getCurrentDateFormatted();
      // Save the review using Redux Toolkit's addReview async thunk
      const reviewData = {
        userId: currentUser.uid,
        name: profileData?.name,
        review: reviewText,
        rating, // Add the rating to the review data
        timestamp: currentDate,
      };
      console.log(reviewData);
      dispatch(addReview({ userId: currentUserId, reviewData }));

      // Reset form and close modal after successful submission
      setReviewText("");
      setRating(0);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold mb-4">User Feedback</h2>
        {/* Add Review button (visible only if the user is logged in) */}
        {auth.currentUser && (
          <button
            onClick={handleAddReview}
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Review
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Display reviews from Redux store */}
        {reviews?.map((review, index) => (
          <div key={index} className="bg-background p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{review?.name}</h3>
            <p className="text-foreground">{review?.review}</p>
            {/* Display the star rating */}
            <div>
              {Array.from({ length: review?.rating }).map((_, index) => (
                <span
                  key={index}
                  role="img"
                  aria-label="star"
                  className="text-yellow-500"
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal background */}
          <div
            className="absolute inset-0 bg-black opacity-75 cursor-pointer"
            onClick={handleModalClose}
          />
          <div className="w-50 h-50 bg-background p-8 rounded-md shadow-md z-10">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              {/* Review text */}
              <textarea
                ref={textareaRef}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full h-40 p-2 bg-background border border-gray-300 rounded-md resize-none outline-none"
              />
              {/* Star rating */}
              <div className="flex items-center mt-4">
                <span className="mr-2 font-bold">Rating:</span>
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(index + 1)}
                    className={`text-2xl ${
                      index < rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              {/* Submit and cancel buttons */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;

// {isModalOpen && (
//   <div className="fixed inset-0 flex items-center justify-center z-50">
//     {/* Modal background with click event to close the modal */}
//     <div
//       className="absolute inset-0 bg-black opacity-75 cursor-pointer"
//       onClick={handleModalClose}
//     />

//       <h3 className="text-xl font-bold mb-4">Write a Review</h3>
//       <form onSubmit={handleSubmitReview}>
//         {/* Review text */}

//         {/* Star rating */}
//         {/* ... (existing JSX code) */}
//         {/* Submit and cancel buttons */}
//         {/* ... (existing JSX code) */}
//       </form>
//     </div>
//   </div>
// )}
