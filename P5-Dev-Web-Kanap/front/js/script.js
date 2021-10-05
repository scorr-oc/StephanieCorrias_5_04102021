fetch("http://localhost:3000/api/products")   
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(product) {
        console.log(value);
    })
    .catch(function(err){
        console.log('une erreur est survenue')
    })

    