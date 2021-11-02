// récupération de l'id du produit à afficher

const urlParams = new URLSearchParams(location.search).get('id')

// ----- Insertion du produit et de ses détails dans la page produit----

fetch(`http://localhost:3000/api/products/${urlParams}`)   
    .then( (response) => {
     return response.json()
    })
    .then((product) => {
        console.log(product)
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

       
        button.addEventListener('click',function(){
            // récuperation des valeurs du panier
            let colorProduct = document.getElementById('colors').value
            let quantProduct = document.getElementById('quantity').value
            let productCart = {
                id : urlParams,
                quantity : parseInt(quantProduct),
                color : colorProduct,
            }   
           console.log(productCart)
            console.log(colorProduct)
            // stockage des données du panier dans le localstorage

            let cartLocal = JSON.parse(localStorage.getItem("product"))
            console.log(cartLocal)

            // fonction pour ajouter les produits dans cartLocal et les envoyer dans le localStorage en JSON
            let addToCart = () => {
                cartLocal.push(productCart);
                localStorage.setItem("product",JSON.stringify(cartLocal));
            
            }
            
        
            // S'il y a des produits dans le localStorage
            if(cartLocal){
                
                
                // s'il le produit est dans le panier
                
            //     if() {
            // //         // on incrémente la quantité
            //         console.log(ok)
     
            //     }
            // //     // si le produit n'est pas dans le panier 
                // else {
                addToCart()
                console.log(cartLocal)
                // }

            }
            // s'il n'y en a pas 
            else {
                    cartLocal = []
                    addToCart()
            }
        })

    
        


     
    
        

    })
    .catch(erreur =>{
        console.log(erreur)
    })