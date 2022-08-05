# 🤖 Mikasa copilot

Todo esto como extension de vscode, en lo posible como lo hace copilot.
El server quedaria corriendo local en la maquina en el puerto 5000 por ejemplo

## 🤑 Recursos
- JS snippets oneliners: https://1loc.dev/
- HTML snippets: htmldom.dev
- Copy paste JS snippers: surma.github.io
- Copy simbols (carets, simbolos raros que no hay en el teclado): symbols.wentin.net
- Get key code JS by passing key name
- Translate


- Snippets engine
  - https://you.com/api/generic?source=w3schools&fields=frontend_code_snippet&version=4&query=javascript+reverse+array&size=15&service=generic_code&filters=%5B%5D
  - https://you.com/api/generic?source=stackoverflow&version=2&query=javascript+reverse+array&size=15&service=generic_stackoverflow&filters=%5B%5D

## 😦 Problemas a solucionar
- [ ] - Latencia (promedio 600 ms.).
- [ ] - Poca efectividad en los snippets.
- [ ] - Extension de vscode y comunicacion con la app.

## 🙃 Posibles soluciones
- Cache, ubicacion del servidor de you, recorte de parametros, reduccion de payload, pings hacia you cada cierto tiempo, puppeteer activo y escuchando.
- Mas recursos, algoritmo de filtrado (busqueda de palabras claves, coincidencias perfectas)
- Investigar y probar

## 🤓 Nice-to-have
- Guardar las respuestas correctas localmente.
- Detecte lenguajes segun la extension sobre la que se trabaje.

## 📃 Diagrama
![copilot made in casa](https://user-images.githubusercontent.com/70329467/182990660-4ae53bbd-0b41-477f-8d15-bff482498f1d.png)
