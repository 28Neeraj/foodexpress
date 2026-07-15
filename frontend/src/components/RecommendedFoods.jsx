import MenuCard from "./MenuCard";

function RecommendedFoods({ menu }) {

  return (

    <div className="mt-20">

      <h2 className="text-4xl font-bold mb-8">

        Recommended Foods

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {menu.slice(0, 4).map((food) => (

          <MenuCard
            key={food._id}
            food={food}
          />

        ))}

      </div>

    </div>

  );

}

export default RecommendedFoods;