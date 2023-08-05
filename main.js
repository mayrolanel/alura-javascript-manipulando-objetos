let items = [];

const form = document.getElementById('form-itens')
const itemInput = document.getElementById('receber-item')

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    salvarItem();
})

function salvarItem() {
    const item = itemInput.value;

    const isDuplicado = items.some((elemento)=> {
        return elemento.valor.toUpperCase() === item.toUpperCase()
    })

    if(!isDuplicado) {
        items.push({
            valor: item
        })
    }
    
    itemInput.value = ''

    console.log(items)
}