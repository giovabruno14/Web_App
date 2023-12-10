document.addEventListener("DOMContentLoaded", function () {
  var listaIndex = 1;
  var nombresListas = [];
  var productosIngresados = {};

  function guardarEnLocalStorage() {
    localStorage.setItem('nombresListas', nombresListas.join(","));
    localStorage.setItem('productosIngresados', Object.keys(productosIngresados).join(","));
  }

  function agregarProductoALista(nombreLista, producto) {
    if (!productosIngresados[nombreLista]) {
      productosIngresados[nombreLista] = [];
    }
    productosIngresados[nombreLista].push(producto);
    guardarEnLocalStorage();
  }

  function eliminarLista(nombreLista) {
    delete productosIngresados[nombreLista];
    guardarEnLocalStorage();
  }

  function eliminarProductoDeLista(nombreLista, producto) {
    var index = productosIngresados[nombreLista].indexOf(producto);
    if (index !== -1) {
      productosIngresados[nombreLista].splice(index, 1);
      guardarEnLocalStorage();
    }
  }

  function renderList(nombreLista, productos) {
    var listasContainer = document.getElementById('listasContainer');
    listasContainer.style.display = 'block';

    var listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    listasContainer.appendChild(listContainer);

    var h1 = document.createElement('h1');
    h1.textContent = nombreLista;
    listContainer.appendChild(h1);

    var productosLista = document.createElement('div');
    productosLista.id = 'productosLista_' + listaIndex;
    listContainer.appendChild(productosLista);

    var productInput = document.createElement('input');
    productInput.type = 'text';
    productInput.classList.add('form-control', 'hidden');
    productInput.addEventListener('input', function () {
      var value = this.value.trim();
      if (productosIngresados[nombreLista] && productosIngresados[nombreLista].includes(value)) {
        this.classList.add('error');
      } else {
        this.classList.remove('error');
      }
    });
    productosLista.appendChild(productInput);

    var agregarBtn = document.createElement('button');
    agregarBtn.textContent = 'Agregar';
    agregarBtn.classList.add('btn', 'btn-primary', 'rounded-pill');
    agregarBtn.addEventListener('click', function () {
      var producto = productInput.value.trim();
      if (producto !== '' && !isNaN(producto)) {
        alert('Debe ingresar palabras en lugar de números.');
        return;
      }

      if (producto !== '') {
        if (productosIngresados[nombreLista] && productosIngresados[nombreLista].includes(producto)) {
          alert('Este producto ya ha sido ingresado.');
          return;
        }

        var productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productosLista.appendChild(productItem);

        var span = document.createElement('span');
        span.textContent = producto;
        productItem.appendChild(span);

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.classList.add('btn', 'btn-danger', 'rounded-pill', 'delete-product-btn');
        deleteBtn.addEventListener('click', function () {
          var nombreLista = this.closest('.list-container').querySelector('h1').textContent;
          var productoAEliminar = this.previousElementSibling.textContent;
          eliminarProductoDeLista(nombreLista, productoAEliminar);
          this.parentElement.remove();
        });
        productItem.appendChild(deleteBtn);

        productInput.value = '';

        if (!productosIngresados[nombreLista]) {
          productosIngresados[nombreLista] = [];
        }
        productosIngresados[nombreLista].push(producto);
        guardarEnLocalStorage();
      }
    });
    productosLista.appendChild(agregarBtn);

    var deleteListBtn = document.createElement('button');
    deleteListBtn.textContent = 'Borrar Lista';
    deleteListBtn.classList.add('delete-list-btn');
    deleteListBtn.addEventListener('click', function () {
      var nombreLista = this.previousElementSibling.textContent;
      eliminarLista(nombreLista);
      listContainer.remove();
      if (!document.querySelector('.list-container')) {
        listasContainer.style.display = 'none';
      }
    });
    listContainer.appendChild(deleteListBtn);

    productInput.classList.toggle('hidden'); // toggle
    listaIndex++;
  }

  document.getElementById('nombreLista').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('crearListaBtn').click();
    }
  });

  document.getElementById('crearListaBtn').addEventListener('click', function () {
    var nombreLista = document.getElementById('nombreLista').value.trim();

    if (nombreLista !== '') {
      nombresListas.push(nombreLista);
      var listasContainer = document.getElementById('listasContainer');
      listasContainer.style.display = 'block';

      var listContainer = document.createElement('div');
      listContainer.classList.add('list-container');
      listasContainer.appendChild(listContainer);

      var h1 = document.createElement('h1');
      h1.textContent = nombreLista;
      listContainer.appendChild(h1);

      var productosLista = document.createElement('div');
      productosLista.id = 'productosLista_' + listaIndex;
      listContainer.appendChild(productosLista);

      var productInput = document.createElement('input');
      productInput.type = 'text';
      productInput.classList.add('form-control', 'hidden');
      productInput.addEventListener('input', function () {
        var value = this.value.trim();
        if (productosIngresados[nombreLista] && productosIngresados[nombreLista].includes(value)) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      });
      productosLista.appendChild(productInput);

      var agregarBtn = document.createElement('button');
      agregarBtn.textContent = 'Agregar';
      agregarBtn.classList.add('btn', 'btn-primary', 'rounded-pill');
      agregarBtn.addEventListener('click', function () {
        var producto = productInput.value.trim();
        if (producto !== '' && !isNaN(producto)) {
          alert('Debe ingresar palabras en lugar de números.');
          return;
        }

        if (producto !== '') {
          if (productosIngresados[nombreLista] && productosIngresados[nombreLista].includes(producto)) {
            alert('Este producto ya ha sido ingresado.');
            return;
          }

          var productItem = document.createElement('div');
          productItem.classList.add('product-item');
          productosLista.appendChild(productItem);

          var span = document.createElement('span');
          span.textContent = producto;
          productItem.appendChild(span);

          var deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Borrar';
          deleteBtn.classList.add('btn', 'btn-danger', 'rounded-pill', 'delete-product-btn');
          deleteBtn.addEventListener('click', function () {
            var nombreLista = this.closest('.list-container').querySelector('h1').textContent;
            var productoAEliminar = this.previousElementSibling.textContent;
            eliminarProductoDeLista(nombreLista, productoAEliminar);
            this.parentElement.remove();
          });
          productItem.appendChild(deleteBtn);

          productInput.value = '';

          if (!productosIngresados[nombreLista]) {
            productosIngresados[nombreLista] = [];
          }
          productosIngresados[nombreLista].push(producto);
          guardarEnLocalStorage();
        }
      });
      productosLista.appendChild(agregarBtn);

      var deleteListBtn = document.createElement('button');
      deleteListBtn.textContent = 'Borrar Lista';
      deleteListBtn.classList.add('delete-list-btn');
      deleteListBtn.addEventListener('click', function () {
        var nombreLista = this.previousElementSibling.textContent;
        eliminarLista(nombreLista);
        listContainer.remove();
        if (!document.querySelector('.list-container')) {
          listasContainer.style.display = 'none';
        }
      });
      listContainer.appendChild(deleteListBtn);

      productInput.classList.toggle('hidden'); 
      listaIndex++;
    }

    var storedLists = localStorage.getItem('productosIngresados') ?
      localStorage.getItem('productosIngresados').split(",") :
      [];
    storedLists.push(nombreLista);
    localStorage.setItem('productosIngresados', storedLists.join(","));

    var storedNames = localStorage.getItem('nombresListas') ?
      localStorage.getItem('nombresListas').split(",") :
      [];
    storedNames.push(nombreLista);
    localStorage.setItem('nombresListas', storedNames.join(","));
  });

  document.addEventListener('keydown', function (event) {
    var productInput = document.querySelector('.product-input input[type="text"]');
    if (event.keyCode === 13 && productInput) {
      event.preventDefault();
      productInput.nextElementSibling.click();
    }
  });

  var storedNames = localStorage.getItem('nombresListas') ?
    localStorage.getItem('nombresListas').split(",") :
    [];
  storedNames.forEach(function (nombreLista) {
    renderList(nombreLista, productosIngresados[nombreLista]);
  });
});

