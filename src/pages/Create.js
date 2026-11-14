import { useState } from "react"
import { supabase } from "../config/supabaseClient.js"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("") 
  const [formError, setFormError] = useState(null)  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    if (!title || !method || !rating) {
      setFormError("Please fill in all fields")
      return
    }
    // Add your Supabase insert logic here
    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])

    if (error) {
      setFormError("Could not create the smoothie recipe")
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    } 
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <label htmlFor="method">Method:</label>
        <textarea 
          value={method} 
          onChange={(e) => setMethod(e.target.value)} 
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
        />
        <button type="submit">Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create