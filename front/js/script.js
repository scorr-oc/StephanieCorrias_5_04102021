fetch("http://localhost:3000/api/products")   
    .then( (response) => {
     return response.json()
    })
    .then((products) => {
        // insertion des produits dans la page d'accueil
        for (let product of products){

            let a = document.createElement('a')
            a.href = `./product.html?id=${product._id}`
            let section = document.getElementById('items')
            section.appendChild(a)

            let article = document.createElement('article'
            )
            a.appendChild(article)
            
            let img = document.createElement('img')
            img.src = `${product.imageUrl}`
            img.alt = `${product.altTxt}`         
            article.appendChild(img)

            let h3 = document.createElement('h3')
            h3.classList.add('productName')
            h3.innerHTML = `${product.name}`           
            article.appendChild(h3)

            let p = document.createElement('p')
            p.classList.add('productDescription')
            p.innerHTML = `${product.description}`
            article.appendChild(p)
        }

    })
    .catch((erreur) =>{
        console.log(erreur)
    })

    