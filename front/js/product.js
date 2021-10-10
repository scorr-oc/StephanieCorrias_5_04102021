// récupération de l'id du produit à afficher

const urlParams = new URLSearchParams(location.search).get('id')


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
        console.log(colors)
        colors.forEach((color) => {
            let colorProduct = color
            let colorMenu = document.createElement('option')
            colorMenu.value = colorProduct
            colorMenu.innerText = colorProduct
            document.getElementById('colors').appendChild(colorMenu)
            console.log(colorMenu)    
        })
    })
    .catch(erreur =>{
        console.log(erreur)
    })