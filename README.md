# Proyecto de Redes 2 - Aplicación Web
Esta es una aplicación web realizado en Angular para el Front-End, usando C# .NET para el Back-End, y SQL Server como motor de base de datos.  
Esta aplicación sirve para gestionar proyectos, y asignar tareas a los proyectos, y asignar multiples usuarios a las tareas, cuenta con un sistema de gestion de usuarios y asignacion de permisos a los usuarios.  
  
Se utilizarón:
- Node.js: Version 20.11.1 LTS
- Angular CLI: Version
- .NET SDK: Version 8.0
- SQL Server 2022

## Tabla de Contenido
* [Objetivos](#objetivos)
* [Requisitos](#requisitos)
* [Ejecución](#ejecución)
* [Desarrolladores](#desarrolladores)

## Objetivos
Este proyecto tiene como objetivo brindar a los estudiantes una experiencia integral en el desarrollo seguro de sitios web, así como en la identificación y mitigación de vulnerabilidades, específicamente en el contexto de las inyecciones SQL.

## Requisitos
Para la ejecución de este proyecto se necesita lo siguiente:
- Un IDE, se recomienda: [Visual Studio Code](https://code.visualstudio.com/).
- El SDK de [.NET 8.0](https://dotnet.microsoft.com/es-es/download/dotnet/8.0).  
Si se desea utilizar una version superior, se deberá modificar el proyecto para que sea compatible con dicha version.
- [Node.js](https://nodejs.org/en).
- El CLI de [Angular](https://angular.io/).  
**Nota:** Se requiere tener instalado primero Node.js antes de instalar el CLI de Angular
- [SQL Server](https://www.microsoft.com/es-es/sql-server/).

## Ejecución
- Una vez instalados los programas requeridos, clonas este repositorio y lo guardas en la carpeta de tu preferencia. Si utilizas la aplicacion de consola **git**, podrás clonar el proyecto con el siguiente comando:
```console
git clone https://github.com/MegaPredator360/ProjectTracker_CS_Angular.git
```
- Una vez que hayas clonado el proyecto serás presentado con 4 carpetas:
    - **Documentación:** Esta carpeta, contendrá un archivo **.html** donde se guardará documentacion necesaria acerca del funcionamiento de la aplicación y un diagrama de clases y otro de entidad - relacion, realizados con [draw.io](https://app.diagrams.net/).
    - **ProjectTrackerAngular:** Esta carpeta contiene los archivos de la aplicacion de Angular.
    - **ProjectTrackerAPI:** Esta carpeta contiene los archivos de la API, que fue realizado usando C# .NET
    - **ProjectTrackerSQL:** Esta carpeta contiene un archivo de formato **.sql** que será el archivo que nos creará la base de datos y las tablas necesarias para el proyecto.

- Configuraremos primero la base de datos: Ya sea utilizando el editor SQL Server Management 2019, o la extension de SQL Server de VS Code, nos conectamos al servidor de SQL y abrimos el archivo **.sql**, y lo ejecutamos.  
El script creará la base de datos y tablas necesarias para la aplicación, además será aninada con 3 usuarios.  
Sus correos inicio de sesion son: **admin<i></i>@correo.com**, **gestor<i></i>@correo.com** y **user<i></i>@correo.com**, los 3 usuarios comparten la misma contraseña **12345**.
- Después, en la API, tenemos que configurar la conexion a la base de datos, por lo que abriremos el archivo **appsettings.json**, ubicado en la siguiente carpeta **ProjectTrackerAPI -> ProjectTracker.API -> appsettings.json**.  
Dentro de ese archivo, buscaremos donde dice: **Server=NombreServidor;**, remplararemos donde dice **NombreServidor** con el nombre de tu servidor local de SQL Server, y guardas el archivo.  
Para inicializar el API, abres la terminal en la carpeta **ProjectTrackerAPI -> ProjectTracker.API**, y escribes el siguiente comando:
```console
dotnet run
```
- Por ultimo, para inicializar la aplicacion web, sin cerrar la linea de comando que se utilizó para cerrar el API, se abre una nueva terminal en la carpeta **ProjectTrackerAngular**.
Primero, se deben de instalar las dependencias del proyecto mediante el siguiente comando:
```console
npm install
```
Una vez se termine de instalar las dependencias, podemos inicializar nuestra aplicación web mediante el siguiente comando:
```console
ng serve --open
```
Con esto, la aplicación estará funcionando de forma correcta.

## Desarrolladores:
* Aaron Steve Alfaro Zamora
* Leonora Blanco Serrano
* Victoria Eugenia Corrales Miranda
* Emmanuel Corrales Ramirez
* Daniela Hidalgo López
* Keilyn Morera Vargas