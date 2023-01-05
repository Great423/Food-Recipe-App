import { useState, useEffect } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function Searched() {
    const [searchedRecipes, setsearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${`20d7f436b2824accb340a9d2586fdd63`}&query=${name}`);
        const recipes = await data.json();
        setsearchedRecipes(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

  return (
    <Grid>
        {searchedRecipes.map(item => {
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


const Grid = styled.div`
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

export default Searched;
