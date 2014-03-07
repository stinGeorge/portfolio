;(function($, window, undefined){
   //Usamos javascript estricto para tener buenas practicas al codear ;D
   'use strict';
   //Definimos la función del plguin para que reciba parámetros de personalización básica
   $.fn.cargador = function(ini, porc, bord, rell, txt, url, scale, time){
      //Iniciamos un loop para que se aplique a todo el array de objetos jQuery
      return this.each(function(){
         //Seleccionamos el objeto al cual se aplico el método
         var $lienzo = $(this),
         lienzo = $lienzo[0];
         //Revisamos si el navegador soporta canvas para no dibujar innecesariamente
         if(lienzo.getContext){
            //Obtenemos el contexto del elemento seleccionado
            var ctx = lienzo.getContext('2d'),
            //Definimos las variables necesarias para la función
            //El alto es radio*2+20+aimgAlto
            alto = lienzo.height,
            ancho = lienzo.width,
            animacion = false,
            radio = 50,
            tamLetra = radio*.4,
            //Creamos una imágen con tamaño fijo y url dinámcia
            imgAlto = 70*scale,
            imgAncho = 70*scale,
            img = new Image(imgAlto, imgAncho);
            img.src = url;
            //Esperamos que el navegador cargue la imagen para renderizarla correctamente en el lienzo
            img.onload = function(){
               //circulo interno
               ctx.beginPath();
               ctx.strokeStyle = txt;
               ctx.lineWidth = 5;
               ctx.arc(ancho/2,radio+10,(radio-15)*scale-1,0,Math.PI/180*360);
               ctx.closePath();
               ctx.stroke();
               //texto del porcentaje
               ctx.fillStyle = txt;
               ctx.font = (tamLetra*scale)+'px Open Sans';
               ctx.textAlign = 'center';
               ctx.textBaseline = 'middle';
               ctx.fillText('0%',ancho/2, radio+10);
               //Ubicacion de la imagen
               ctx.drawImage(img, ancho/2 - imgAncho/2, radio*2+20, imgAncho, imgAlto);
               //Definimos el evento y el elemento que lo va a activar
               $('#skills').on('click',function(e){
                  e.preventDefault();
                  //Evitamos que se ejecuten varios eventos al mismo tiempo, sino que espere a que termine uno para iniciar otro
                  if(!animacion){
                     animacion = true;
                     carga(ini, porc);
                  }
               });
            }
         }
         //Función que se encarga de simular el dibujo del circulo frame por frame
         function carga(ini){
            var ciclo = setInterval(function(){
               if(ini <= porc){
                  dib_cir(ini);
                  ini++;
               }else{
                  //Detenemos el bucle para poder iniciar otra animación
                  clearInterval(ciclo);
                  animacion = false;
               }
               console.log(lienzo);
               console.log(time/porc);
            },time/porc);
         }
         //Función que dibuja directamente sobre el lienzo con todas sus propiedades
         function dib_cir(porc){
            //Limpiamos el lienzo para renderizar el sgt. frame
            ctx.clearRect(0, 0, ancho, alto);
            ctx.drawImage(img, ancho/2 - imgAncho/2, radio*2+20, imgAncho, imgAlto);
            //Obtenemos el angulo preciso para el frame
            var ang = (360*porc)/100;
            //ciculo externo
            ctx.beginPath();
            ctx.fillStyle = bord;
            //Carga de derecha a izquierda
            ctx.arc(ancho/2,radio+10,radio*scale+1,(Math.PI/-2),(Math.PI/180*ang)-(Math.PI/2));
            ctx.arc(ancho/2,radio+10,10*scale,(Math.PI/180*ang)-(Math.PI/2),(Math.PI/-2));
            //Carga de izquierda a derecha
            /*ctx.arc(100,80,75,(Math.PI/-2),(Math.PI/-2)+(Math.PI/180*-ang),true);
            ctx.arc(100,80,10,(Math.PI/-2)+(Math.PI/180*-ang),(Math.PI/-2),true);*/
            ctx.closePath();
            ctx.fill();
            //ciculo medio
            ctx.beginPath();
            ctx.fillStyle = rell;
            ctx.arc(ancho/2,radio+10,(radio-10)*scale,0,Math.PI/180*360);
            ctx.closePath();
            ctx.fill();
            //circulo interno
            ctx.beginPath();
            ctx.strokeStyle = txt;
            ctx.lineWidth = 5;
            ctx.arc(ancho/2,radio+10,(radio-15)*scale-1,0,Math.PI/180*360);
            ctx.closePath();
            ctx.stroke();
            //texto del porcentaje
            ctx.fillStyle = txt;
            ctx.font = (tamLetra*scale)+'px Open Sans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(porc+'%',ancho/2, radio+10);
         }
      });
   }

})(jQuery, window);