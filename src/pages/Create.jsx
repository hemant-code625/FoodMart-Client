import React, { useState } from 'react'
import {useGetUserID} from '../hooks/useGetUserID'
import {useNavigate} from "react-router-dom"
import { useCookies } from "react-cookie";

import axios from 'axios'
const Create = () => {
  const userID = useGetUserID();
  const [cookies ,_] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageURL:"",
    cookingTime:0,
    userOwner: userID
  })

  const navigate = useNavigate();

  // setting up blank field in ingredients
  const handleAddIngredient =()=>{
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({...recipe, ingredients});
    // console.log(ingredients);
  }

  const handleChange=(event)=>{
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value});            // here square brackets means that name attribute in the input-field 
  }

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit =async (event)=>{
    event.preventDefault();
    try{
      await axios.post(`${import.meta.env.VITE_VERCEL_SERVER_URL}/recipes`,
      recipe,
      {headers:{ authorization: cookies.access_token}});
      alert("Recipe created Successfully!");
      navigate("/")
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className='create-recipe'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            id='ingredients'
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" className='add-btn' onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions: </label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instruction}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageURL">Image URL</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={recipe.imageURL}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button className='submit-btn' type="Submit">Create Recipe</button>
      </form>
    </div>
  )
}

export default Create