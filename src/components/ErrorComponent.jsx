export const ErrorComponent = ({ message }) => {
  return (
    <article className='error-component'>
      <p>❌</p>
      <p>Error en la carga de los personajes:</p>
      <p>{message}</p>
    </article>
  )
}
