 // récupération du panier dans le localStorage
let cartLocal = JSON.parse(localStorage.getItem("cart"))

// Création des variables pour la somme des articles et le calcul du prix total
let totalProduct = 0
let totalPrice = 0

// Vérifier si le panier est vide
if(cartLocal === null) {
    document.querySelector('h1').innerText = "VOTRE PANIER EST VIDE"
    alert("Le panier est vide")
} 

// Si le panier n'est pas vide
else {
// ---------- Création, insertion et modificataion des éléments dans la page panier ----------------- 

    cartLocal.forEach(item => {
        fetch(`http://localhost:3000/api/products/${item.id}`)
            .then(response => response.json())
            .then(product => {
                
                let idItem = document.createElement('article')
                idItem.className = 'cart__item'
                idItem.dataset.id = item.id
                document.querySelector('#cart__items').appendChild(idItem) 

                let divImg = document.createElement('div')
                divImg.className = 'cart__item__img'
                idItem.appendChild(divImg)

                // Insertion de l'image
                let img = document.createElement('img')
                img.src = product.imageUrl
                img.alt = product.altTxt
                divImg.appendChild(img)

                let divContent = document.createElement('div')
                divContent.className = 'cart__item__content'
                idItem.appendChild(divContent)
                
                let divTitle = document.createElement('div')
                divTitle.className = 'cart__item__content__titlePrice'
                divContent.appendChild(divTitle)
                        
                // Insertion du nom du produit
                let h2 = document.createElement('h2')
                h2.innerHTML = `${product.name} - ${item.color}`
                divTitle.appendChild(h2)  
                
                // Insertion du prix du produit
                let price = document.createElement('p')
                let priceItem = item.quantity * product.price
                price.innerHTML = `${priceItem} €`
                divTitle.appendChild(price) 
                function cartPrice(){
                totalPrice += priceItem
                }
                cartPrice()
        
                let divSettings = document.createElement('div')
                divSettings.className = 'cart__item__content__settings'
                divContent.appendChild(divSettings)
                
                
                let divQuantity = document.createElement('div')
                divQuantity.className = 'cart__item__content__settings__quantity'
                divSettings.appendChild(divQuantity)
                
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
                inputQuantity.value = item.quantity
                divQuantity.appendChild(inputQuantity)
                let productQuantity = Number(inputQuantity.value)
                totalProduct += productQuantity
                
                let divDelete = document.createElement('div')
                divDelete.className = 'cart__item__content__settings__delete'
                divSettings.appendChild(divDelete)
                
                let pDelete = document.createElement('p')
                pDelete.className = 'deleteItem'
                pDelete.innerHTML = 'Supprimer'
                divDelete.appendChild(pDelete)
                
                console.log(cartLocal)
                console.log(pDelete)
                
                // Insertion de la quantité totale et du prix total
                function cartTotal(){
                document.getElementById("totalQuantity").innerText = totalProduct
                document.getElementById("totalPrice").innerText = totalPrice
                }
                cartTotal()

                // ------ changement de quantité d'un produit du panier ---
                inputQuantity.addEventListener('change',(e)=> {
                    cartLocal.forEach (item => {
                        // Répération de la valeur modifiée
                        const quantityChange = Number(inputQuantity.value)
                        console.log(quantityChange)

                        // Mise à jour du prix avec la nouvelle quantité
                        priceItem= quantityChange * product.price
                        console.log(priceItem)
                        price.innerHTML = `${priceItem} €`

                        // mise à jour du panier avec les nouvelles données


                        
                        // Mise à  jour totale des prix et quantité
        
                        console.log(cartLocal)
                    })

                })



                // ------ suppression d'un élément du panier ------
               
                pDelete.addEventListener('click',(e) => {
         
                    cartLocal.forEach ( item => {
                        // Récupération de l'élément parent à supprimer
                        let parent = e.target.closest('[data-id]')
                        //   récupération de l'id du produit à supprimer
                        let idDelete = parent.dataset.id

                        // Suppression du produit du localStorage
                        const cartUpdate = cartLocal.filter((item) => item.id !== idDelete)
                        localStorage.setItem('cart', JSON.stringify(cartUpdate))
                        
                        // Suppression du produit dans le DOM
                        parent.remove()
                        alert('Votre panier est vide')

                        // Je récupère mon panier mis à jour
                        let newCart = JSON.parse(localStorage.getItem("cart"))
                        location.reload()
                        
                    })    
                })
            })        
        .catch((erreur) =>{
            console.log(erreur)
        })        
    })
}


// message d'erreur formulaire
// document.getElementById("firstNameErrorMsg").innerHTML = "Ceci est un message d'erreur"
            
 