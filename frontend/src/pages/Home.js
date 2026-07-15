import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import RestaurantSection from "../components/RestaurantSection";
import OfferBanner from "../components/OfferBanner";
import PopularFoods from "../components/PopularFoods";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <RestaurantSection />
      <OfferBanner />
      <PopularFoods />
      <Footer />
    </>
  );
}

export default Home;