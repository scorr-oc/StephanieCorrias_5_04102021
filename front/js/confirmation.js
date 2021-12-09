/*
  récupération de l'id du produit à afficher
*/
const urlParams = new URLSearchParams(location.search).get('id')


/*
insertion du numéro de commande dans la page confirmation
*/
document.getElementById('orderId').innerHTML = urlParams
