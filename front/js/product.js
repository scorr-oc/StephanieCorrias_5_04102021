// récupération de l'id du produit à afficher

const urlParams = new URLSearchParams(location.search).get('id')

// ----- Insertion du produit et de ses détails dans la page produit----

fetch(`http://localhost:3000/api/products/${urlParams}`)   
    .then( (response) => {
     return response.json()
    })
    .then((product) => {
    
        // insertion de la photo du produit
        let imgProduct = document.createElement('img')
        imgProduct.src = `${product.imageUrl}`
        imgProduct.alt = `${product.altTxt}` 
        document.querySelector('.item__img').appendChild(imgProduct) 

        // insertion du nom du produit
        document.getElementById('title').innerHTML = `${product.name}`

        // insertion du prix
        document.getElementById('price').innerText = `${product.price} `

        // insertion de la description
        document.getElementById('description').innerText = `${product.description} `

        // insertion des données du menu déroulant
        let colors = product.colors 
        colors.forEach((color) => {
            let colorProduct = color
            let colorMenu = document.createElement('option')
            colorMenu.value = colorProduct
            colorMenu.innerText = colorProduct
            document.getElementById('colors').appendChild(colorMenu)  
        })
 
       
        
        
        // -------ajoût du produit dans le panier au clic --------
        
        let button = document.getElementById('addToCart')
        // Aller à la page panier lors du clic
        button.innerHTML = `<a href="./cart.html">Ajouter au panier </a>` 
        
          
       
        button.addEventListener('click',function(){
        
            // récuperation des valeurs choisies par l'utilisateur lors du clic
            const idProduct = urlParams
            const colorProduct = document.getElementById('colors').value
            const quantProduct = document.getElementById('quantity').value
            let productCart = {
                id : idProduct,
                quantity : Number(quantProduct),
                color : colorProduct,
            }   
           

            // récupération du panier dans le localStorage

            let cartLocal = JSON.parse(localStorage.getItem("cart"))
        
            // 1 - Vérifier que le panier ne soit pas vide
            if(cartLocal){
                let cartUpdate = []
                let isExist = false;
                
                // 2- Rechercher si l'ID du produit est dans le panier
                cartLocal.forEach(item => {
                    if (item.id === idProduct && item.color === colorProduct){
                        item.quantity = Number(item.quantity) + Number(quantProduct)
                        isExist = true
                    }
                    // on met le panier à jour avec la nouvelle quantité
                    cartUpdate.push(item);
                    })

                    // 3 - Ajout du produit dans le panier s'il ne s'y trouve pas
                    if(!isExist) {
                        cartUpdate.push(productCart)
                    }
                    localStorage.setItem("cart", JSON.stringify(cartUpdate))
                }
            // si le panier est vide
            else {
                    cartLocal = [productCart]
                    localStorage.setItem("cart",JSON.stringify(cartLocal))
                    
            }
            
            
        })
    })
    .catch(erreur =>{
        console.log(erreur)
    })