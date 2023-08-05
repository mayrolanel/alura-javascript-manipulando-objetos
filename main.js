let items = [];

const form = document.getElementById('form-itens')
const itemInput = document.getElementById('receber-item')
const listaItems = document.getElementById('lista-de-itens')
const itemsComprados = document.getElementById('itens-comprados')

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    salvarItem();
    mostrarItems();
})

function salvarItem() {
    const item = itemInput.value;

    const isDuplicado = items.some((elemento)=> {
        return elemento.valor.toUpperCase() === item.toUpperCase()
    })

    if(!isDuplicado) {
        items.push({
            valor: item,
            isCheck: false
        })
    }
    
    itemInput.value = ''

    console.log(items)
}

function mostrarItems() {
    listaItems.innerHTML = '',
    itemsComprados.innerHTML = ''

    items.forEach((elemento, index)=> {
        if(elemento.isCheck) {
            itemsComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${elemento.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
                `
                return
        } 
            listaItems.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor}"></input>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
                `
        
    })


    const isChecked = document.querySelectorAll('input[type="checkbox"]')

    isChecked.forEach((elemento)=> {
        elemento.addEventListener('click', (evento)=> {
            const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            items[valorElemento].isCheck = evento.target.checked
            console.log('ormos')
            mostrarItems()
        })
    })

}