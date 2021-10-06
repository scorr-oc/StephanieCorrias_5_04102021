class Products{
    constructor(jsonProducts){
        jsonProducts && Object.assign(this, jsonProducts);
    }
}