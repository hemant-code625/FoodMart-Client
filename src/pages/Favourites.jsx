import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";
const Favourites = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const navigateToLogin =()=>{
    navigate('/auth')
  }
  const fetchSavedRecipes = async()=>{
     
    try{
      const response = await axios.get(`${import.meta.env.VITE_VERCEL_SERVER_URL}/recipes/savedRecipes/${userID}`)
      setSavedRecipes(response.data);
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
      savedRecipes.length === 0 ? <> 
      <div class="loader">
      <p class="text">
      <span class="letter letter1">L</span>
      <span class="letter letter2">o</span>
      <span class="letter letter3">a</span>
      <span class="letter letter4">d</span>
      <span class="letter letter5">i</span>
      <span class="letter letter6">n</span>
      <span class="letter letter7">g</span>
      <span class="letter letter8">.</span>
      <span class="letter letter9">.</span>
      <span class="letter letter10">.</span>
      </p>
    </div>
      <p className='fav-note'>If not Logged in then first <button className="auth-btn" onClick={navigateToLogin}> login </button > to see your favourite recipes</p> </>
      : (savedRecipes.map((recipe)=>(
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
      )))
    }
    </>
  )
}

export default Favourites
