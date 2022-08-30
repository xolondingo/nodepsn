# nodepsn
### Ejercicio simple de aplicación NodeJS

Este sencillo ejercicio solo muestra un listado en pantalla obtenido desde una consulta a una base de datos **MySQL**. El objetivo es poder usarlo para pruebas de despliegue y **DevOps**.

Se basa en el módulo *Express* de *NodeJS* y *MySQL*.

``` [JavaScript]
const express = require('express');

const server = express();

server.get('/', function(req, res) {
	res.send('<h1>Hola Mundo</h1>');
});

server.listen(3000, function() {
	console.log('Servidor en puerto 3000');
});
```

> La vida es muy corta para aprender alemán. -Tad Marburg