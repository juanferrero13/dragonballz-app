import React, { useEffect, useState } from 'react'
import { ErrorComponent } from './ErrorComponent.jsx'

const URL_CHARACTERS = 'https://dragonball-api.com/api/characters'
export const Characters = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [nextPage, setNextPage] = useState(URL_CHARACTERS)
  const [prevPage, setPrevPage] = useState(URL_CHARACTERS)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true)
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(
            `Error en la petición: ${res.status} - ${res.statusText}`
          )
        }
        const data = await res.json()
        setData(data.items)
        setNextPage(data.links.next)
        setPrevPage(data.links.last)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData(`${URL_CHARACTERS}?page=${currentPage}&limit=10`)
  }, [currentPage])

  if (error) {
    return <ErrorComponent message={error.message} />
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    window.scrollTo({ top: 0 })
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <>
      <section className='cards-container'>
        {loading ? (
          <p className='loading-characters'>Loading...</p>
        ) : (
          data.map((character) => (
            <div className='cards' key={character.id}>
              <div className='character-image'>
                {' '}
                <img
                  className='image'
                  src={character.image}
                  alt={`Imagen del personaje: ${character.name}`}
                />
              </div>
              <h2 className='character-name'>{character.name}</h2>
              <h3 className='character-origin'>
                {character.race} - {character.gender}
              </h3>
              <p className='character-features'>
                Base KI:
                <br />
                <span className='character-features-span'> {character.ki}</span>
              </p>
              <p className='character-features'>
                Total KI:
                <br />
                <span className='character-features-span'>
                  {character.maxKi}
                </span>
              </p>
              <p className='character-features'>
                Afilliation:
                <br />
                <span className='character-features-span'>
                  {character.affiliation}
                </span>
              </p>
            </div>
          ))
        )}
      </section>
      <div className='button-container'>
        {currentPage === 1
          ? ''
          : prevPage && (
              <button className='button' onClick={handlePrevPage}>
                Anterior
              </button>
            )}
        {nextPage && (
          <button className='button' onClick={handleNextPage}>
            Siguiente
          </button>
        )}
      </div>
    </>
  )
}
