let inputNewProduct = document.querySelector('#inputNewProduct');
let btnAddProduct = document.querySelector('#btnAddProduct');
let listProduct = document.querySelector('#listProduct');
let windowEdit = document.querySelector('#windowEdit');
let windowEditBtnClose = document.querySelector('#windowEditBtnClose');
let btnUpdateProduct = document.querySelector('#btnUpdateProduct');
let inputProductNameEdit = document.querySelector('#inputProductNameEdit');
let idProductEdit = document.querySelector('#idProductEdit');

btnAddProduct.addEventListener('click', (e) => {
    let product = {
        name: inputNewProduct.value,
        id: generateId(),
    }
    addProduct(product);
});

btnUpdateProduct.addEventListener('click', (e) => {
    e.preventDefault();

    let product = {
        name: inputProductNameEdit.value,
        id: idGlobal, //Editado
    }

    let productOld = document.getElementById('' + idGlobal + '');
    if(productOld) {
        let li = createTagLI(product);
        listProduct.replaceChild(li, productOld);
    } else {
        alert('Nenhum elemento encontrado');
    }
    
    inputProductNameEdit.value = '';
})

function generateId() {
    return Math.floor(Math.random() * 3000);
}

function addProduct(product) {
    let li = createTagLI(product);
    let div = createTagLabel(product);
    listProduct.appendChild(li);
    listProduct.appendChild(div);
    inputNewProduct.value = '';
}

function createTagLI(product) {
    let li = document.createElement('li');
    li.id = product.id;

    let span = document.createElement('span');
    span.classList.add('textProduct');
    span.innerHTML = product.name;

    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btnAction');
    btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEdit.setAttribute('onclick', 'edit('+ product.id +')');

    let btnRemove = document.createElement('button');
    btnRemove.classList.add('btnAction');
    btnRemove.innerHTML = '<i class="fa fa-trash"></i>';
    btnRemove.setAttribute('onclick', 'remove('+ product.id +')');

    div.appendChild(btnEdit);
    div.appendChild(btnRemove);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function createTagLabel(product) {
    let div = document.createElement('div');
    div.classList.add('responsible');
    div.id = product.id;

    let labelName = document.createElement('label');
    labelName.id = "name";

    let labelEmail = document.createElement('label');
    labelEmail.id = "email";

    let br = document.createElement('br');

    div.appendChild(labelName);
    div.appendChild(br);
    div.appendChild(labelEmail);


    fetch(`https://randomuser.me/api/`, {})
    .then((response) => { return response.json();
    }).then((data) => {
        let name = 'Nome: ' + data.results[0].name.first + ' ' + data.results[0].name.last;
        let email = 'E-mail: ' + data.results[0].email;
        
        labelName.innerHTML = name;
        labelEmail.innerHTML = email;

    }).catch(e => alert('deu erro'))

    return div;
}

var idGlobal = 0

function edit(idProduct) {
    let li = document.getElementById('' + idProduct + '');
    inputProductNameEdit.value = li.innerText;
    idGlobal = idProduct;
}

function remove(idProduct) {
    for(let li in listProduct) {
        li = document.getElementById('' + idProduct + '');
        listProduct.removeChild(li);
    }
}