import { supabase } from "../config/supabaseClient.js"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard.js"

const Home = () => {
  const [ fetchError, setFetchError ] = useState(null)
  const [ smoothies, setSmoothies ] = useState(null)

  const handleDelete = (id) => {
    setSmoothies((prev) => {
      return prev.filter((sm) => sm.id !== id)
    })
  }
  
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
          .from("smoothies")
          .select()

      if (error) {
        setFetchError("Could not fetch the smoothies")
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard 
              key={smoothie.id} 
              smoothie={smoothie} 
              onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home