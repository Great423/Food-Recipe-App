import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${`20d7f436b2824accb340a9d2586fdd63`}&cuisine=${name}`);
        const recipe = await data.json();
        setCuisine(recipe.results);
    };

    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    }, [params.type])

  return (
    <Grid 
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        {cuisine.map(item => {
            return (
                <Card key={item.id}>
                    <Link to={'/recipe/' + item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    grid-gap: 2rem
`

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 1.5rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        padding: 1rem;
        text-align: center;
    }
`

export default Cuisine;
