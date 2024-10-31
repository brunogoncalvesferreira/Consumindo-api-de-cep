const input = document.querySelector('input')
const button = document.querySelector('button')
const result = document.querySelector('.result')
const map = document.querySelector('.map')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
})

button.addEventListener('click', handleGetAddress)

async function handleGetAddress() {
  const cep = input.value

  if (cep.length === 0) {
    return alert('Digite um cep por favor!')
  }

  const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
  const data = await response.json()

  if(data.cep === undefined) {
    return alert('CEP inválido')
  }
  

  result.innerHTML = `
  <p>CEP ${data.cep}</p>
  <p>Endereço ${data.street}</p>
  <p>Bairro ${data.neighborhood}</p>
  <p>Cidade ${data.city}</p>
  <p>Estado ${data.state}</p>
  `

  const latitude = data.location.coordinates.latitude
  const longitude = data.location.coordinates.longitude

  map.innerHTML = `
  
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14820.48448828184!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1730381581473!5m2!1spt-BR!2sbr"
    width="100%"
    height="450"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
  `

  input.value = ''
  input.focus()
}
