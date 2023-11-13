let submitButton = document.querySelector('#app form button')
let zipCodeField = document.querySelector('#app form input')
let content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event){
    event.preventDefault();

    var zipCode = zipCodeField.value 
    zipCode = zipCode.replace(' ', '');
    zipCode = zipCode.replace('.', '');
    zipCode = zipCode.trim()

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/' )
    .then(function(response){
        if(response.error){
            throw new Error('Ops!...Not Found')
        }

        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf)
        createLine(response.data.bairro)
    }).catch(function (error){
        console.log(error)
        content.innerHTML = ''
        createLine('Ops!...Nothing')
    })
}

function createLine(text){
    let line = document.createElement('p')
    let textNode = document.createTextNode(text)

    line.appendChild(textNode)
    content.appendChild(line)
}