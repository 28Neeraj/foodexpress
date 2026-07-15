function ReviewSection() {

  const reviews = [

    {

      name: "Rahul",

      rating: 5,

      comment: "Amazing food and super fast delivery."

    },

    {

      name: "Anjali",

      rating: 4,

      comment: "Fresh food. Will order again."

    },

    {

      name: "Rohit",

      rating: 5,

      comment: "Loved the taste."

    }

  ];

  return (

    <div className="mt-20">

      <h2 className="text-4xl font-bold mb-8">

        Customer Reviews

      </h2>

      <div className="grid grid-cols-3 gap-8">

        {

          reviews.map((review, index) => (

            <div

              key={index}

              className="shadow-xl rounded-2xl p-6"

            >

              <h2 className="font-bold text-2xl">

                {review.name}

              </h2>

              <p className="mt-2">

                ⭐ {review.rating}

              </p>

              <p className="mt-4">

                {review.comment}

              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default ReviewSection;