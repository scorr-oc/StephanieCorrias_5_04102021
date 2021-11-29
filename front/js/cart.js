 // récupération du panier dans le localStorage
let cartLocal = JSON.parse(localStorage.getItem("cart"))

// Création des variables pour la somme des articles et le calcul du prix total
let totalProduct = 0
let totalPrice = 0

// Fonction pour le calcul du panier

function cartTotal(productQuantity , priceItem){
    totalProduct += productQuantity
    totalPrice += priceItem
    document.getElementById("totalQuantity").innerText = totalProduct
    document.getElementById("totalPrice").innerText = totalPrice
    }

// Vérifier si le panier est vide
if(cartLocal === null || cartLocal.lenght === 0) {
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
                
                let divDelete = document.createElement('div')
                divDelete.className = 'cart__item__content__settings__delete'
                divSettings.appendChild(divDelete)
                
                let pDelete = document.createElement('p')
                pDelete.className = 'deleteItem'
                pDelete.innerHTML = 'Supprimer'
                divDelete.appendChild(pDelete)
                      
                // Insertion de la quantité totale et du prix total
                
                cartTotal(productQuantity , priceItem)

                // ------ changement de quantité d'un produit du panier ---

                inputQuantity.addEventListener('change',(e)=> {
                    cartLocal.forEach (item => {
                        // Récupération de l'élément parent à supprimer
                        let parent = e.target.closest('[data-id]')
                        //   récupération de l'id du produit à supprimer
                        let idUpdate = parent.dataset.id
                        
                        if(item.id === idUpdate) {
                            item.quantity = e.target.value
                        }
                    })
                     
                    localStorage.setItem('cart', JSON.stringify(cartLocal))
                    location.reload()
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
                        
                        // Rafraîchissment de la page   
                        location.reload()
                    })    
                })
            })        
        .catch((erreur) =>{
            console.log(erreur)
        })        
    })
}

// --- RECUPERATION ET VALIDATION DES DONNEES DU FORMULAIRE ---

// Récupération du formulaire

let form = document.querySelector('.cart__order__form')

// Fonction de validation des noms
const validName = (inputName => {
    let nameRegExp = /[0-9]/
    let errorMsg = inputName.nextElementSibling

    if (inputName.value.match(nameRegExp)){
        errorMsg.innerHTML = "Le format n'est pas valide - Veuillez utiliser des lettres"    
        return false
    } else if (inputName.value === "") {
        errorMsg.innerHTML = "Merci de remplir ce champ"
        return false
    } else {
        errorMsg.innerHTML = " "
        return true
    }
 })

//  Fonction de la validation de l'e-mail

 const validEmail = (inputEmail => {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
    let errorEmail = document.getElementById('emailErrorMsg')

    if(emailRegExp.test(inputEmail.value)){
        errorEmail.innerHTML = " "
        return true
    } else {
        if(inputEmail.value === ""){
            errorEmail.innerHTML = 'Merci de remplir ce champ' 
        } else {  
        errorEmail.innerHTML = 'Email non valide'
        }

        return false
    }
})
console.log(form.value)


// Ecoute de la modification du prénom
form.firstName.addEventListener('change', () => {
    validName(form.firstName)
 })

 // Ecoute de la modification du nom
form.lastName.addEventListener('change', () => {
    validName(form.lastName)
 })

 // Ecoute de la modification de l'adresse
 form.address.addEventListener('change', () => {
    if (form.address.value === "") {
    document.getElementById('addressErrorMsg').innerHTML = "Merci de remplir ce champ"
    
    } else {
    document.getElementById('addressErrorMsg').innerHTML = " "

    }
 })

 // Ecoute de la modification du nom
form.city.addEventListener('change', () => {
    validName(form.city)
 })

 // Ecoute de la modification de l'email
form.email.addEventListener('change', () => {
    validEmail(form.email)
 })

//  Récupération des données du formulaire sous forme d'objet

let button = document.getElementById('order')

button.addEventListener('click', () => {

        let contact = {
            prénom : document.getElementById('firstName').value,
            nom : document.getElementById('lastName').value,
            adresse : document.getElementById('address').value,
            ville : document.getElementById('city').value,
            email : document.getElementById('email').value  
        }
    console.log(contact)    
   
})
    

 




            
 