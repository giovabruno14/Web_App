document.addEventListener('DOMContentLoaded', function() {
    var listaIndex = 1;
    var nombresListas = JSON.parse(localStorage.getItem('nombresListas')) || [];
    var productosIngresados = JSON.parse(localStorage.getItem('productosIngresados')) || {};
  
    function guardarEnLocalStorage() {
      localStorage.setItem('nombresListas', JSON.stringify(nombresListas));
      localStorage.setItem('productosIngresados', JSON.stringify(productosIngresados));
    }
  
    document.getElementById('crearListaBtn').addEventListener('click', function() {
      var nombreLista = document.getElementById('nombreLista').value.trim();
      if (nombreLista !== '') {
        nombresListas.push(nombreLista);
        guardarEnLocalStorage();
      }
    });
  
    document.addEventListener('click', function(event) {
      if (event.target.closest('.product-input button')) {
        var nombreLista = event.target.closest('.list-container').querySelector('h1').textContent;
        var producto = event.target.closest('.product-input').querySelector('input').value.trim();
        if (producto !== '' && !isNaN(producto)) {
          alert('Debe ingresar palabras en lugar de números.');
          return;
        }
        if (producto !== '') {
          guardarEnLocalStorage();
        }
      }
  
      if (event.target.closest('.delete-list-btn')) {
        var nombreLista = event.target.closest('.list-container').querySelector('h1').textContent;
        guardarEnLocalStorage();
      }
  
      if (event.target.closest('.product-item button')) {
        var nombreLista = event.target.closest('.list-container').querySelector('h1').textContent;
        var producto = event.target.closest('.product-item').querySelector('span').textContent;
        guardarEnLocalStorage();
      }
    });
  });
  