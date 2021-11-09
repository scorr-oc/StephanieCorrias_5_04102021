
// ---------- Création et insertion des éléments dans la page panier -----------------

fetch("http://localhost:3000/api/products")   
    .then( (response) => {
     return response.json()
    })
    .then((products) => {

        // récupération du panier dans le localStorage

        let cartLocal = JSON.parse(localStorage.getItem("cart"))
       
       
        cartLocal.forEach(item => {
        
        let idCart = item.id
        let quantityCart = item.quantity
        let colorCart = item.color
    
    
        // for ( let product of products) {
        //     let idProduct = `./product.html?id=${product._id}`
        //     console.log(idProduct)

        //     let imgProduct = document.createElement('img')
        //     imgProduct.src = `${product.imageUrl}`
        //     imgProduct.alt = `${product.altTxt}`
        //     console.log(imgProduct)
        // }

        let idItem = document.createElement('article')
        idItem.className = 'cart__item'
        idItem.dataset.id = idCart
        document.querySelector('#cart__items').appendChild(idItem) 
        console.log(idItem)

        let divImg = document.createElement('div')
        divImg.className = 'cart__item__img'
        idItem.appendChild(divImg)
        console.log(divImg)

        // Insertion de l'image
        // let img = document.createElement('img')
        // img.src =  `../products/${products.imageUrl}`
        // img.alt =  `${products.imageUrl}`
        // div.appendChild(img)
        // console.log(img)

        let divContent = document.createElement('div')
        divContent.className = 'cart__item__content'
        idItem.appendChild(divContent)
        console.log(divContent)

        let divTitle = document.createElement('div')
        divTitle.className = 'cart__item__content__titlePrice'
        divContent.appendChild(divTitle)
        console.log(divTitle)
        
        // Insertion du nom du produit
        let h2 = document.createElement('h2')
        // h2.innerHTML = product.title
        divTitle.appendChild(h2)  

        // Insertion du prix du produit
        let price = document.createElement('p')
        // price.innerHTML = product.price
        divTitle.appendChild(price) 

        let divSettings = document.createElement('div')
        divSettings.className = 'cart__item__content__settings'
        divContent.appendChild(divSettings)
        console.log(divSettings)

        let divQuantity = document.createElement('div')
        divQuantity.className = 'cart__item__content__settings__quantity'
        divSettings.appendChild(divQuantity)
        console.log(divSettings)

        let quantity = document.createElement('p')
        quantity.innerHTML = "Qté : "
        divQuantity.appendChild(quantity)

        // Insertion de la quantité
        let inputQuantity = document.createElement('input')
        inputQuantity.type = "number"
        inputQuantity.className = "itemQuantity"
        inputQuantity.name = "itemQuantity"
        inputQuantity.min = "1"
        inputQuantity.max = "100"
        // inputQuantity.value = item.quantity
        divQuantity.appendChild(inputQuantity)
        console.log(inputQuantity)

        let divDelete = document.createElement('div')
        divDelete.className = 'cart__item__content__settings__delete'
        divSettings.appendChild(divDelete)
        console.log(divSettings)

        let pDelete = document.createElement('p')
        pDelete.className = 'deleteItem'
        pDelete.innerHTML = 'Supprimer'
        divDelete.appendChild(pDelete)

        // Calcul de la quantité totale et du prix total
        // document.getElementById("totalQuantity").innerHTML =
        // document.getElementById("totalPrice").innerHTML =


        // message d'erreur formulaire
        document.getElementById("firstNameErrorMsg").innerHTML = "Ceci est un message d'erreur"
            
        });


    })
    .catch((erreur) =>{
        console.log(erreur)
    })

    