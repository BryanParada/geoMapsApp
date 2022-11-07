export { PlacesService } from './places.service';
export { MapService } from './map.service';


// el archivo index sirve como  una forma de acumular exportaciones de varios módulos en un solo módulo,
// es un archivo de módulo que reexporta exportaciones seleccionadas de otros módulos.

// cuando hagas el import  de unos de esos modulos el archivo index es implicito , o sea que cuando hagas el
// import {} from 'directory_name' buscará index.ts dentro del directorio especificado e importará lo que se exporte allí.