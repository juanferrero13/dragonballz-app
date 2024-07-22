const LINKEDIN = 'https://www.linkedin.com/in/juanpabloferrero/'

export const Footer = () => {
  return (
    <div className='footer'>
      sitio desarrollado por{' '}
      <a href={LINKEDIN} target='_blank' rel='noreferrer'>
        Juan Pablo Ferrero
      </a>
      .
    </div>
  )
}
