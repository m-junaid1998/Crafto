import { CategorySection } from "./CategorySection";
import { Hero } from "./Hero";
import { ProductList } from "./ProductList";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductList />
      <Testimonials/>
    </>
  );
};

export default Home;
