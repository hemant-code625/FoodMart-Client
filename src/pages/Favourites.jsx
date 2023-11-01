import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const Favourites = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies ,_] = useCookies(["access_token"]);
  const userID = useGetUserID();


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
      (!cookies.access_token) ? <div className='empty'> <> <h1> You are not Logged in </h1> </> 
      <p> Login to see your saved recipes here... </p></div> :
      (savedRecipes.length) === 0 ? <div className='empty'> <h1>Favourites page is Empty!</h1> </div>  :
      (savedRecipes.map((recipe)=>(
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
