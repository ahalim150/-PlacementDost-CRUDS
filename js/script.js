var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");

var products = []
var mainIndex;

if(localStorage.getItem("products") != null){
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

function addProduct(){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }

    if(document.getElementById("addUpdateBtn").innerHTML == "Add Product"){
        products.push(product);
    }
    else{
        products.splice(mainIndex, 1, product)
        document.getElementById("addUpdateBtn").innerHTML = "Add Product"
    }

    localStorage.setItem("products", JSON.stringify(products))

    displayProducts();
    clearForm();
}

function displayProducts(){
    var searchTerm = document.getElementById("searchInput").value;
    var cartoona = ""
    for(i = 0 ; i < products.length ; i++){
      if(products[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
        cartoona += `
          <tr>
          <td>${i}</td>
          <td>${products[i].name}</td>
          <td>${products[i].price}</td>
          <td>${products[i].category}</td>
          <td>${products[i].desc}</td>
          <td>
              <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
          </td>
          <td>
              <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
          </td>
          </tr>`
      }
    }
    document.getElementById("tBody").innerHTML = cartoona;
}

function clearForm(){
    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productDescInput.value = ""
}

function deleteProduct(index){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2",
          cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            products.splice(index, 1);
            displayProducts();
            localStorage.setItem("products", JSON.stringify(products));

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
            icon: "error"
          });
        }
      });
}

function updateProduct(index){
    mainIndex = index;

    productNameInput.value = products[index].name
    productPriceInput.value = products[index].price
    productCategoryInput.value = products[index].category
    productDescInput.value = products[index].desc

    document.getElementById("addUpdateBtn").innerHTML = "Update Product"
}

// function search(){
//   var searchTerm = document.getElementById("searchInput").value;
//   var cartoona = ""

//   for (i = 0; i < products.length; i++) {

//     if(products[i].name.toLowerCase().includes(searchTerm.toLowerCase())){

//       cartoona += `
//         <tr>
//         <td>${i}</td>
//         <td>${products[i].name}</td>
//         <td>${products[i].price}</td>
//         <td>${products[i].category}</td>
//         <td>${products[i].desc}</td>
//         <td>
//             <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
//         </td>
//         <td>
//             <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
//         </td>
//         </tr>`
//     }
//   }
// document.getElementById("tBody").innerHTML = cartoona;

// }