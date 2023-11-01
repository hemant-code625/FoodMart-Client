import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies ,_] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VERCEL_SERVER_URL}/recipes`);
        setRecipes(response.data.recipes);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VERCEL_SERVER_URL}/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_VERCEL_SERVER_URL}/recipes`, {
        userID,
        recipeID,
      },{headers:{ authorization: cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <ul>
        { recipes.length === 0 ?<> 
        <div className="spinnerContainer">
        <div className="spinner"></div>
        <div className="home-loader">
          <p className="loader-para">loading</p>
          <div className="words">
            <span className="word">posts</span>
            <span className="word">images</span>
            <span className="word">users</span>
            <span className="word">data</span>
            <span className="word">posts</span>
          </div>
        </div>
      </div>
        </> : ( recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <button className="bookmarkBtn"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                <span className="IconContainer"> 
                <svg viewBox="0 0 384 512" height="0.9em" className="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
                </span>
                {isRecipeSaved(recipe._id) ? <p className="text">Saved</p> : <p className="text">Save</p>}
              </button>
          </li>
        )))}
      </ul>
    </div>
  );
};

export default Home;