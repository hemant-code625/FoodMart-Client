import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';

const Favourites = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const fetchSavedRecipes = async(event)=>{
     
    try{
      const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
      console.log(response.data.savedRecipes)
      setSavedRecipes(response.data.savedRecipes);
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    fetchSavedRecipes();
  });
  return (
    
    <>
    {
      savedRecipes && savedRecipes.map((recipe)=>(
        <li key={recipe._id}>
        <div>
          <h2>{recipe.name}</h2>
        </div>
        <div className="instructions">
          <p>{recipe.instructions}</p>
        </div>
        <img src={recipe.imageURL} alt={recipe.name} />
        <p>Cooking Time: {recipe.cookingTime} minutes</p>
      </li> 
      ))
    }
    </>
  )
}

export default Favourites
