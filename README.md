# 🔥PROYECTO DRAGON BALL🔥

# Justificación i motivación del proyecto 💁🏻
En este proyecyo nos hemos dedicado a hacer un proyecto dedicado a unos de los animes más famosos. Nos mostrará exactamente los personajes, transformaciones y planetas de algunas sagas de este anime. Hemos acordado en hacer el proyecto dedicado a esta serie con razón a que nos gusta el anime y hemos decidido a hacer sobre este clásico.
#Esquema de arquitectura

# Explicación detallada del codigo desarrollado hacia la arquitectura modelo-vista-controlador. ✍️
Anteriori nos hemos puesto a instalar Json.NET - Newtonsoft para no tener ningún problema respecto a la instancia de apis.
Nos hemos puesto a buscar páginas para buscar apis de DRAGON BALL, hemos cogido api’s dónde nos muestre algunos personajes, planetas y transformaciones de la serie
Este sería exactamente la página dónde hemos encontrado las apis adjuntas al proyecto:
https://web.dragonball-api.com/documentation
A partir de esta página hemos cogido las url’s de respuesta correspondientes y hemos descargado el archivo json y lo hemos transformado a c# con la página https://json2csharp.com/

Url’s de respuesta:

  -👨Personajes: https://dragonball-api.com/api/characters
  -🪐Planetas: https://dragonball-api.com/api/planets
  -🔥Transformaciones: https://dragonball-api.com/api/transformations
  
Estas url’s las hemos puesto en nuestro homecontroller para el loger y que coja respuestas de las url’s de nuestras api’s.
Ej: 
public IActionResult Index()
   {
       const string apiUrl = "https://dragonball-api.com/api/characters";


       var client = new HttpClient();
       var response = client.GetAsync(apiUrl).Result;
       var content = response.Content.ReadAsStringAsync().Result;


       var model = JsonConvert.DeserializeObject<Root>(content);
       return View(model);


   }

También hemos creado 3 .cs’s para poner el código transformado de json a c# uno por cada api.
Una vez hecho creamos  3 index.cs en nuestras views dónde mostramos exactamente la info seleccionada por nosotros por cada api.
Y finalmente, en el Layout hemos agregado los links para acceder a cada 1 de las api’s.
Generalmente no hemos tenido ningun problema respecto a la conexión de api’s ya que estaban enlistadas el único que no estaba enlistado fué la api de transformaciones que tuvimos que declarar una lista en el index2.cshtml y en el home controller, con esto ya funcionaba.


# Propuestas de mejora y nuevas funcionalidadess.
