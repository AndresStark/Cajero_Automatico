document.getElementById("extraer").addEventListener("click", entregarDinero);
document.getElementById("reiniciar").addEventListener("click", reiniciarEstado);

class Billete{
	constructor(v, c){
		this.imagen = new Image();
		this.valor = v;
		this.cantidad = c;

		this.imagen.src = imagenes[this.valor];
	}
	mostrar(){
		document.getElementById("efectivo").appendChild(this.imagen);
	}
}

var caja = [];
var imagenes = [];

var dinero;
var papeles = 0;
var div = 0;

var resultado = document.getElementById("resultado");
var dinero_restante = document.getElementById("d_restante");



imagenes[5] = "5.jpg";
imagenes[10] = "10.jpg";
imagenes[20] = "20.jpg";
imagenes[50] = "50.jpg";
imagenes[100] = "100.jpg";

caja.push(new Billete(100, 5));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 5));
caja.push(new Billete(10, 10));
caja.push(new Billete(5, 5));



estadoDinero();



function estadoDinero(){
	for(estado of caja){
		dinero_restante.innerHTML += estado.valor + ": " + estado.cantidad + "<br>";
	}
}

function reiniciarEstado(){
	resultado.innerHTML = "";
	document.getElementById("d_restante").innerHTML = "";
	document.getElementById("dinero").value = 0;
	document.getElementById("efectivo").innerHTML = "";
	resultado.value = 0;
	estadoDinero();
}

function entregarDinero(){
	var entregado = [];
	document.getElementById("d_restante").innerHTML = "";
	var t = document.getElementById("dinero");
	dinero = parseInt(t.value);
	for(bi of caja){
		if(dinero > 0){
			div = Math.floor(dinero / bi.valor);
			if(div > bi.cantidad){
				papeles = bi.cantidad;
			}
			else{
				papeles = div;
			}

			entregado.push(new Billete(bi.valor, papeles));
			dinero = dinero - (bi.valor * papeles);
			if (dinero > 0){}
			else{
				bi.cantidad = bi.cantidad - (papeles);
			}
			
		}

	}
	if (dinero > 0){
		resultado.innerHTML = "Soy un cajero malo, he sido malo y no puedo darte esa cantidad";
		estadoDinero();
	}
	else{
		for(var e of entregado){
			if(e.cantidad > 0){
				resultado.innerHTML += + e.cantidad + " billetes de $" + e.valor + "<br>";
				for(im = 0; im <= e.cantidad; im++){
					e.mostrar();
				}
			}

		}
		estadoDinero();

	}

}
