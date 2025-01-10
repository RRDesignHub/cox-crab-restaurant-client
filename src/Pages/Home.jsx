import { Banner } from "../Components/Banner";
import { Category } from "../Components/Category";
import { PopularDish } from "../Components/PopularDish";
import { Testimonial } from "../Components/Testimonial";

export const Home = () => {
  return (
    <>
      <div>
        <Banner></Banner>
        <Category></Category>
        <PopularDish></PopularDish>
        <Testimonial></Testimonial>
      </div>
    </>
  );
};
