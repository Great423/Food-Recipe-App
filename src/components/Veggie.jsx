import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

function Veggie() {

  const [Veggie, setVeggie] = useState([]);

  useEffect(() => {
      getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if(check) {
      setVeggie(JSON.parse(check));
    }else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${`20d7f436b2824accb340a9d2586fdd63`}&number=9`);
      const data = await api.json();
      
      localStorage.setItem("veggie", JSON.stringify(data.recipes));

      setVeggie(data.recipes);
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Our Veggie Picks</h3>

        <Splide options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "2rem",

          breakpoints: {
            640: {
               perPage: 1,
              //  arrows: true,
            },
            768: {
               perPage: 2,
            },
            960: {
               perPage: 3,
            },
         },
        }}>
          {Veggie.map(recipe => (
            <SplideSlide key={recipe.id}>
              <Card>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 3rem 0rem;

  h3 {
    font-size: 1.2rem;
  }
`
const Card = styled.div`
  min-height: 12rem;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 1.5rem;
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute; 
    left: 0;
  }
  p {
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    z-index: 10;
    width: 100%;
    font-weight: 500;
    font-size: .8rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Gradient = styled.div` 
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Veggie;
