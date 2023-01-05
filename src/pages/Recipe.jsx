import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${`20d7f436b2824accb340a9d2586fdd63`}`);
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
   

  return (
    <Detailwrapper>
      <div> 
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} /> 
      </div>
      <Info>
        <div className="btns">
          <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button> 
          <Button className={activeTab === 'ingredients' ? 'active' : ''}  onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        </div>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </Detailwrapper>
  );
}

const Detailwrapper = styled.div`
  max-height: 25rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  li {
    font-size: 1rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }

  img {
    width: 20rem;
  }
`;

const Button = styled.button`
  padding: .6rem 1.6rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 2rem;
`;

const Info = styled.div`
  margin-left: 5rem;
  h3 {
    font-size: 1rem;
  }
  .btns {
    display: flex;
  }
`

export default Recipe;

