document.addEventListener("DOMContentLoaded", function () {
  var listaIndex = 1;
  var nombresListas = [];
  var productosIngresados = {};

  document.getElementById("startButton").addEventListener("click", function () {
    document.querySelector(".contenedorBienvenida").style.display = "none";
    document.querySelector(".list-form").style.display = "block";
  });

  document.getElementById("nombreLista").addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("crearListaBtn").click();
    }
  });

  document.getElementById("crearListaBtn").addEventListener("click", function () {
    var nombreLista = document.getElementById("nombreLista").value.trim();

    if (nombreLista !== "") {
      nombresListas.push(nombreLista);
      document.getElementById("listasContainer").style.display = "block";

      var listasContainer = document.getElementById("listasContainer");

      var listContainer = document.createElement("div");
      listContainer.classList.add("list-container");
      listasContainer.appendChild(listContainer);

      var h1 = document.createElement("h1");
      h1.textContent = nombreLista;
      listContainer.appendChild(h1);

      var productosLista = document.createElement("div");
      productosLista.id = "productosLista_" + listaIndex;
      listContainer.appendChild(productosLista);

      var productInput = document.createElement("div");
      productInput.classList.add("product-input");
      productosLista.appendChild(productInput);

      var label = document.createElement("label");
      label.textContent = "Ingrese un producto:";
      productInput.appendChild(label);

      var productoInput = document.createElement("input");
      productoInput.type = "text";
      productoInput.classList.add("form-control");
      productoInput.addEventListener("input", function () {
        var value = this.value.trim();
        if (
          productosIngresados[nombreLista] &&
          productosIngresados[nombreLista].includes(value)
        ) {
          this.classList.add("error");
        } else {
          this.classList.remove("error");
        }
      });
      productInput.appendChild(productoInput);

      var addButton = document.createElement("button");
      addButton.textContent = "Agregar";
      addButton.classList.add("btn", "btn-primary", "rounded-pill");
      addButton.addEventListener("click", function () {
        var producto = productoInput.value.trim();

        if (producto !== "" && !isNaN(producto)) {
          alert("Debe ingresar palabras en lugar de números.");
          return;
        }

        if (producto !== "") {
          if (
            productosIngresados[nombreLista] &&
            productosIngresados[nombreLista].includes(producto)
          ) {
            alert("Este producto ya ha sido ingresado.");
            return;
          }

          var productItem = document.createElement("div");
          productItem.classList.add("product-item");
          productosLista.appendChild(productItem);

          var label = document.createElement("label");
          label.innerHTML = '<input type="checkbox">';
          productItem.appendChild(label);

          var span = document.createElement("span");
          span.textContent = producto;
          productItem.appendChild(span);

          productoInput.value = "";

          if (!productosIngresados[nombreLista]) {
            productosIngresados[nombreLista] = [];
          }
          productosIngresados[nombreLista].push(producto);

          localStorage.setItem(
            "listasGuardadas",
            Object.keys(productosIngresados).join(",")
          );
        }
      });
      productInput.appendChild(addButton);

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Borrar Lista";
      deleteButton.classList.add("delete-list-btn");
      deleteButton.addEventListener("click", function () {
        delete productosIngresados[nombreLista];
        listContainer.remove();
        if (document.querySelectorAll(".list-container").length === 0) {
          document.getElementById("listasContainer").style.display = "none";
        }

        localStorage.setItem(
          "listasGuardadas",
          Object.keys(productosIngresados).join(",")
        );
      });
      listContainer.appendChild(deleteButton);

      listaIndex++;
    }

    var storedLists =
      localStorage.getItem("listasGuardadas") ?
      localStorage.getItem("listasGuardadas").split(",") :
      [];
    storedLists.push(nombreLista);
    localStorage.setItem("listasGuardadas", storedLists.join(","));
  });

  document.addEventListener("keydown", function (event) {
    var target = event.target;
    if (target && target.matches('.product-input input[type="text"]')) {
      if (event.keyCode === 13) {
        event.preventDefault();
        target.nextElementSibling.click();
      }
    }
  });

  var storedLists = localStorage.getItem("listasGuardadas") ?
    localStorage.getItem("listasGuardadas").split(",") :
    [];
  storedLists.forEach(function (nombreLista) {
    nombresListas.push(nombreLista);
    document.getElementById("listasContainer").style.display = "block";

    var listasContainer = document.getElementById("listasContainer");

    var listContainer = document.createElement("div");
    listContainer.classList.add("list-container");
    listasContainer.appendChild(listContainer);

    var h1 = document.createElement("h1");
    h1.textContent = nombreLista;
    listContainer.appendChild(h1);

    var productosLista = document.createElement("div");
    productosLista.id = "productosLista_" + listaIndex;
    listContainer.appendChild(productosLista);

    if (productosIngresados[nombreLista]) {
      productosIngresados[nombreLista].forEach(function (producto) {
        var productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productosLista.appendChild(productItem);

        var label = document.createElement("label");
        label.innerHTML = '<input type="checkbox">';
        productItem.appendChild(label);

        var span = document.createElement("span");
        span.textContent = producto;
        productItem.appendChild(span);
      });
    }

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar Lista";
    deleteButton.classList.add("delete-list-btn");
    deleteButton.addEventListener("click", function () {});
    listContainer.appendChild(deleteButton);

    listaIndex++;
  });
});
