const urlParams = new URLSearchParams(location.search).get('id')

fetch(`http://localhost:3000/api/products/${urlParams}`)   
    .then( (response) => {
     return response.json()
    })
    .then((product) => {
        console.log(product)

        let imgProduct = document.createElement('img')
        imgProduct.src = `${product.imageUrl}`
        imgProduct.alt = `${product.altTxt}` 
        console.log(imgProduct)
        
        
    
       

    })
    .catch((erreur) =>{
        console.log(erreur)
    })