let items = [];
let itemAEditar

const form = document.getElementById('form-itens')
const itemInput = document.getElementById('receber-item')
const listaItems = document.getElementById('lista-de-itens')
const itemsComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(items))
}

if(listaRecuperada) {
    items = JSON.parse(listaRecuperada)
    mostrarItems();
} else {
    items = []
}

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
                        <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled': ''}></input>
                    </div>
                    <div>
                        ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()" ><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' :'<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
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
            mostrarItems()
        })
    })

    const deletarObjetos = document.querySelectorAll('.deletar')
    deletarObjetos.forEach((elemento)=> {
        elemento.addEventListener('click', (evento)=> {
            const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            items.splice(valorElemento,1)
            mostrarItems()
        })
        
    })

    const editarItens = document.querySelectorAll('.editar')
    editarItens.forEach((elemento)=> {
        elemento.addEventListener('click', (evento)=> {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItems()
        })
        
    })

    atualizaLocalStorage()

}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    items[itemAEditar].valor = itemEditado.value;
    itemAEditar = -1
    mostrarItems()

}