create table caracteristicas_producto (
   codigo_caracteristica number not null,
   codigo_producto       number not null,
   caracteristica        varchar2(100) not null,
   descripcion           varchar2(1000) not null
);

create table carrito (
   codigo_comprador number not null,
   codigo_producto  number not null,
   cantidad         number not null
);

-- Llenado
create table categorias (
   codigo_categoria number not null,
   categoria_padre  number,
   nombre_categoria varchar2(500) not null,
   imagen           varchar(500)
);

create table comentarios (
   codigo_comentario   number not null,
   codigo_producto     number not null,
   codigo_comentarista number not null,
   comentario          varchar2(1000) not null,
   fecha_publicacion   date not null,
   valoracion          float not null,
   imagen              varchar2(1000)
);

--Llenado
create table devoluciones (
   codigo_devolucion number not null,
   dias_devolucion   number not null
);

--Llenado
create table estados_producto (
   codigo_estado number not null,
   estado        varchar2(50) not null
);

create table favoritos (
   codigo_usuario  number not null,
   codigo_producto number not null,
   fecha_guardado  date not null
);

--Llenado
create table formas_pago (
   codigo_pago number not null,
   tipo_pago   varchar2(50) not null
);

create table historial_compras (
   codigo_compra            number not null,
   codigo_producto_comprado number not null,
   codigo_comprador         number not null,
   fecha_compra             date not null,
   cantidad_comprado        number not null,
   subtotal                 float not null
);

create table pagos_por_usuarios (
   codigo_comprador   number not null,
   codigo_formas_pago number not null,
   numero_tarjeta varchar2(50),
   fecha_vencimiento date,
   cvv number,
   nombre_titular varchar2(100),
   apellido_titular varchar2(100),
   usuario_paypal varchar2(100),
   correo_paypal varchar2(100)
);

create table productos (
   codigo_producto        number not null,
   codigo_categoria       number not null,
   usuario_vendedor       number not null,
   nombre_producto        varchar2(100) not null,
   descripcion            varchar2(1000) not null,
   precio                 float not null,
   codigo_estado          number not null,
   envio_precio           float not null,
   codigo_devolucion      number not null,
   fecha_publicacion      date not null,
   cantidad_producto      number not null,
   marca                  varchar2(100) not null,
   modelo                 varchar2(100) not null
);

create table imagen_x_producto (
   codigo_producto number not null,
   imagen_producto varchar2(1000) not null
);

--Llenado
create table tipos_usuarios (
   codigo_tipo_usuario number not null,
   tipo_usuario        varchar2(20) not null
);

create table usuarios (
   codigo_usuario      number not null,
   username            varchar(100) not null,
   contraseña          varchar2(500) not null,
   nombre_usuario      varchar2(50) not null,
   apellido_usuario    varchar2(50) not null,
   correo_electronico  varchar2(50) not null,
   numero_telefono     varchar2(50) not null,
   direccion           varchar2(100) not null,
   codigo_tipo_usuario number not null,
   valoracion_total    float,
   imagen_perfil       varchar2(1000),
   codigo_pais         number not null,
   fecha_creacion      date not null
);

--Llenable
create table paises (
   codigo_pais number not null,
   pais        varchar(100) not null
);

create table vendedores_guardados(
   codigo_usuario number not null,
   codigo_vendedor number not null
);

create table lista_de_favoritos(
   codigo_usuario number not null,
   codigo_producto number not null
);

--Inserts devoluciones
insert into devoluciones (
   codigo_devolucion,
   dias_devolucion
) values ( 1,
           0 );
insert into devoluciones (
   codigo_devolucion,
   dias_devolucion
) values ( 2,
           14 );
insert into devoluciones (
   codigo_devolucion,
   dias_devolucion
) values ( 3,
           30 );
insert into devoluciones (
   codigo_devolucion,
   dias_devolucion
) values ( 4,
           60 );

--Inserts de los paises
create sequence sq_codigo_pais increment by 1;

insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Afganistan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Albania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Algeria' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Samoa Americana' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Andorra' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Angola' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Anguilla' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Antartida' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Antigua y Barbuda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Argentina' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Armenia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Aruba' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Australia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Austria' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Azerbaiyan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bahamas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bahrein' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bangladesh' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Barbados' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bielorrusia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Belgica' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Belice' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Benin' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bermuda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Butan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bolivia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bosnia-Herzegovina' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Botswana' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Brasil' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Brunei' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Bulgaria' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Burkina Faso' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Burundi' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Camboya' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Camerun' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Canada' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Cabo Verde' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Caiman' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Republica Centroafricana' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Chad' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Chile' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'China' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Isla de Navidad' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Cocos' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Colombia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Comores' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Republica del Congo' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Republica Democratica del Congo' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Cook' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Costa Rica' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Costa de Marfil' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Croacia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Cuba' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Chipre' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Republica Checa' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Dinamarca' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Djibouti' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Dominica' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Republica Dominicana' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Ecuador' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Egipto' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'El Salvador' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guinea Ecuatorial' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Eritrea' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Estonia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Etiopia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Malvinas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Feroe' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Fiji' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Finlandia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Francia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guyana Francesa' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Polinesia Francesa' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tierras Australes y Antarticas Francesas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Gabón' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Gambia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Georgia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Alemania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Ghana' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Gibraltar' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Grecia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Groenlandia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Granada' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guadalupe' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guam' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guatemala' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guinea' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guinea‑Bissau' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Guyana' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Haiti' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Vaticano' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Honduras' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Hong Kong' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Hungria' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islandia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'India' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Indonesia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Iran' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Iraq' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Irlanda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Israel' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Italia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Jamaica' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Japón' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Jordania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Kazajstan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Kenia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Kiribati' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Corea del Norte' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Corea del Sur' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Kuwait' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Kirguistan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Laos' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Letonia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Libano' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Lesotho' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Liberia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Libia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Liechtenstein' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Lituania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Luxemburgo' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Macao' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Macedonia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Madagascar' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Malawi' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Malasia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Maldivas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mali' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Malta' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Marshall' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Martinica' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mauritania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mauricio' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mayotte' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mexico' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Estados Federados de Micronesia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Moldavia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mónaco' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mongolia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Montserrat' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Marruecos' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Mozambique' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Myanmar' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Namibia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Nauru' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Nepal' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Holanda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Antillas Holandesas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Nueva Caledonia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Nueva Zelanda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Nicaragua' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Niger' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Nigeria' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Niue' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Norfolk' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Marianas del Norte' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Noruega' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Oman' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Pakistan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Palau' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Palestina' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Panama' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Papua Nueva Guinea' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Paraguay' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Peru' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Filipinas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Pitcairn' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Polonia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Portugal' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Puerto Rico' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Qatar' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Reunión' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Rumania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Rusia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Ruanda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Santa Helena' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'San Kitts y Nevis' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Santa Lucia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'San Vicente y Granadinas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Samoa' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'San Marino' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Santo Tome y Principe' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Arabia Saudita' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Senegal' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Serbia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Seychelles' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Sierra Leona' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Singapur' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Eslovaquia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Eslovenia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Salomón' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Somalia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Sudafrica' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'España' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Sri Lanka' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Sudan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Surinam' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Swazilandia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Suecia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Suiza' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Siria' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Taiwan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tadjikistan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tanzania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tailandia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Timor Oriental' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Togo' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tokelau' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tonga' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Trinidad y Tobago' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tunez' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Turquia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Turkmenistan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Turcas y Caicos' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Tuvalu' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Uganda' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Ucrania' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Emiratos arabes Unidos' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Reino Unido' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Estados Unidos' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Uruguay' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Uzbekistan' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Vanuatu' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Venezuela' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Vietnam' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Virgenes Britanicas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Islas Virgenes Americanas' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Wallis y Futuna' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Sahara Occidental' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Yemen' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Zambia' );
insert into paises (
   codigo_pais,
   pais
) values ( sq_codigo_pais.nextval,
           'Zimbabwe' );

--Inserts de estados de producto
insert into estados_producto (
   codigo_estado,
   estado
) values ( 1,
           'Nuevo' );

insert into estados_producto (
   codigo_estado,
   estado
) values ( 2,
           'Usado' );

insert into estados_producto (
   codigo_estado,
   estado
) values ( 3,
           'Por partes, no funciona' );

insert into estados_producto (
   codigo_estado,
   estado
) values ( 4,
           'Fuera de la caja' );

create sequence sq_codigo_categoria increment by 1;

--Inserts categorias padres
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Tecnologia',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Vehiculos',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Moda',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Coleccionables y Arte',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Deportes',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Salud y Belleza',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Equipo Industrial',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           null,
           'Hogar y Jardin',
           null );


--Inserts subcategorias de tecnologia
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'TV,video y audio para el hogar',
           'assets/img/TV.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Celulares y accesorios',
           'assets/img/Celulares.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Videojuegos y consolas',
           'assets/img/videojuegos.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Computadoras y accesorios',
           'assets/img/Computadoras.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Camaras y fotos',
           'assets/img/camara.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Drones con camara',
           'assets/img/Drones.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Reacondicionados',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Hogar Inteligente',
           'assets/img/Smart Home.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Audio portatil y audifonos',
           'assets/img/audifonos.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           1,
           'Relojes inteligentes',
           'assets/img/Reloj.webp' );

--Inserts subcategorias  de vehiculos
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Piezas para auto y camioneta',
           'assets/img/Piezas Auto.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Herramientas y suministros',
           'assets/img/Herramientas.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Turbo cargadores',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Amortiguadores',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'GPS',
           'assets/img/GPS.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Entradas de aire',
           'assets/img/Entrada Aire.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Piezas para motocicletas',
           'assets/img/Piezas Moto.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Accesorios',
           'assets/img/Accesorios Vehiculos.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Llantas',
           'assets/img/llantas.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           2,
           'Motores y Piezas',
           'assets/img/motor.webp' );

--Inserts subcategorias  de Moda
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Ropa para mujer',
           'assets/img/Ropa Mujer.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Calzado para mujer',
           'assets/img/Calzado Mujer.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Ropa para hombre',
           'assets/img/Ropa Hombre.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Calzado para hombre',
           'assets/img/Calzado Hombre.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Relojes',
           'assets/img/Reloj Moda.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Joyeria',
           'assets/img/Joyeria.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Accesorios para hombre',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Accesorios para mujer',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Sneakers',
           'assets/img/Sneakers.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Bolsos y carteras para mujeres',
           'assets/img/Cartera Mujer.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Lentes de sol para hombres',
           'assets/img/Lentes Sol.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           3,
           'Lentes de sol para mujeres',
           'assets/img/Lentes Sol.webp' );

--Inserts subcategoria de Coleccionables
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Coleccionables',
           'assets/img/Coleccionables.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Arte',
           'assets/img/Arte.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Figuras de accion',
           'assets/img/Figuras.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Dibujos animados',
           'assets/img/Dibujos Animados.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Personajes de pelicula y TV',
           'assets/img/Personajes.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Juegos de cartas coleccionables',
           'assets/img/Cartas.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Antiguedades',
           'assets/img/Antiguedad.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Comics',
           'assets/img/Comics.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           4,
           'Funko Pop',
           'assets/img/Funko.webp' );

--Inserts subcategoria de Deportes
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Ciclismo',
           'assets/img/Ciclismo.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Fitness, Running y Yoga',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Fitness Tech',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Pesca',
           'assets/img/Pesca.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Camping',
           'assets/img/Camping.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Golf',
           'assets/img/Golf.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Deportes de equipo',
           'assets/img/Deporte Equipo.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Deportes de invierno',
           'assets/img/Invierno.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Deportes acuaticos',
           'assets/img/Acuaticos.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           5,
           'Box y MMA',
           null );

--Inserts de Salud y Belleza
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Belleza',
           'assets/img/Belleza.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Maquillaje',
           'assets/img/Maquillaje.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Salud',
           'assets/img/Salud.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Manicura y pedicura',
           'assets/img/Manicure.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Productos para el cabello',
           'assets/img/Cabello.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Productos para la piel',
           'assets/img/Piel.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Productos ortopedicos',
           'assets/img/Ortopedico.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Baño e higiene personal',
           'assets/img/Baño.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Higiene bucal',
           'assets/img/Bucal.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Afeitado y depilacion',
           'assets/img/Depilacion.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Vitaminas y suplementos alimenticios',
           'assets/img/Suplementos.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           6,
           'Masajeadores',
           'assets/img/Masajeador.webp' );


--Inserts de Equipo Industrial
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Salud, laboratorio y odontologia',
           'assets/img/Lab Salud.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Equipo y suministros electronicos',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Metalurgia y manufactura',
           'assets/img/Metalurgia.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Motores y automatizacion industrial',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Piezas y accesorios para equipo pesado',
           'assets/img/Equipo Pesado.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Herramientas y equipo industrial ligero',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Equipo de inspeccion, medicion y pruebas',
           'assets/img/Medicion.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Embalaje y envio',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Equipo y suministros de oficina',
           'assets/img/Oficina.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Impresion y artes graficas',
           'assets/img/Impresiones.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Restaurantes y servicio de alimentos',
           'assets/img/Restaurantes.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Mantenimiento y seguridad',
           'assets/img/Seguridad.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           7,
           'Venta minorista y servicio',
           null );


--Inserts de Hogar y Jardin
insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Herramientas y Equipos de taller',
           'assets/img/Herramientas Hogar.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Patio, Jardin y Exteriores',
           'assets/img/Jardin.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Mejoras para el hogar',
           'assets/img/Mejoras Hogar.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Cocina, Comedor y Bar',
           'assets/img/Cocina.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Lamparas, Luces y Ventiladores de techo',
           'assets/img/Lamparas.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Decoracion de interiores',
           'assets/img/Decoracion.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Organizacion del hogar',
           null );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Electrodomesticos',
           'assets/img/Electrodomesticos.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Juguetes',
           'assets/img/Juguetes.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Mascotas',
           'assets/img/Mascotas.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Manualidades',
           'assets/img/Manualidades.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Suministros de arte',
           'assets/img/Suministros.webp' );

insert into categorias (
   codigo_categoria,
   categoria_padre,
   nombre_categoria,
   imagen
) values ( sq_codigo_categoria.nextval,
           8,
           'Instrumentos musicales',
           'assets/img/Instrumentos.webp' );

--Inserts tipos de usuarios
insert into tipos_usuarios (
   codigo_tipo_usuario,
   tipo_usuario
) values ( 1,
           'Comprador' );
insert into tipos_usuarios (
   codigo_tipo_usuario,
   tipo_usuario
) values ( 2,
           'Vendedor' );

--Inserts tipos de pago
insert into formas_pago (
   codigo_pago,
   tipo_pago
) values ( 1,
           'Tarjeta de Credito/Debito' );

insert into formas_pago (
   codigo_pago,
   tipo_pago
) values ( 2,
           'Paypal' );

--Inserts datos de prueba en productos


--Inserts usuarios de prueba


--Secuencias para el uso del programa
create sequence sq_codigo_usuario increment by 1 start with 11;

create sequence sq_codigo_producto increment by 1 start with 98;

create sequence sq_codigo_caracteristica increment by 1;

commit;

--Agregar al modelo relacional
/*
Nueva Tabla Imagen x producto
Nueva tabla de paises
Campo paises a usuarios
Campo url a categorias
Eliminar tabla mensajeria
Eliminar tabla pujas
Eliminar tabla subastas
Eliminar tabla tipo_estado_sub
Eliminar tabla tipos_pujas
Borrar campo acepta_devolucion en devoluciones
Eliminar tabla productos_por_pago
Agregar campo descripcion a usuarios
Agregar campo fecha_creacion a usuarios
*/

--Campo pruebas

select pais
  from usuarios a
  left join paises b
on a.codigo_pais = b.codigo_pais
 where a.codigo_usuario = 1;

select a.codigo_usuario,
       a.username,
       a.nombre_usuario,
       a.apellido_usuario,
       a.correo_electronico,
       a.numero_telefono,
       a.direccion,
       a.valoracion_total,
       a.imagen_perfil,
       a.codigo_pais,
       b.pais
  from usuarios a
  left join paises b
on a.codigo_pais = b.codigo_pais
 where username = 'ieescoto'
    or correo_electronico = 'asdsad';

select nombre_categoria
  from categorias
 where categoria_padre is not null;

--7 dias entrega temprana y 30 dias entrega tarde
select sysdate + 7
  from dual;

select codigo_producto
  from productos
 order by codigo_producto desc;

select a.nombre_producto,
       a.codigo_producto,
       Min(b.imagen_producto) as imagen_producto
  from productos a
  left join imagen_x_producto b
on a.codigo_producto = b.codigo_producto
where a.usuario_vendedor = 21
group by a.nombre_producto,a.codigo_producto
order by a.codigo_producto;

select count(nombre_producto) as cantidad
from productos
where usuario_vendedor = 21;

select a.nombre_producto,
a.precio,
a.envio_precio,
b.username,
c.estado,
min(d.imagen_producto) as imagen_producto 
from productos a 
left join usuarios b 
on a.usuario_vendedor = b.codigo_usuario 
left join estados_producto c 
on a.codigo_estado = c.codigo_estado 
left join imagen_x_producto d 
on a.codigo_producto = d.codigo_producto 
where LOWER(nombre_producto) LIKE LOWER('%Nin%') 
group by a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,a.codigo_producto;

select a.nombre_producto,
a.precio,
a.envio_precio,
b.username,
c.estado,
min(d.imagen_producto) as imagen_producto 
from productos a 
left join usuarios b 
on a.usuario_vendedor = b.codigo_usuario 
left join estados_producto c 
on a.codigo_estado = c.codigo_estado 
left join imagen_x_producto d 
on a.codigo_producto = d.codigo_producto 
where a.codigo_categoria = 11 
group by a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,a.codigo_producto;

select a.nombre_producto,
b.username,
NVL(b.valoracion_total,0) as valoracion_total,
a.precio,
c.estado,
a.cantidad_producto,
a.marca,
a.modelo,
d.nombre_categoria
from productos a 
left join usuarios b 
on a.usuario_vendedor = b.codigo_usuario 
left join estados_producto c 
on a.codigo_estado = c.codigo_estado
left join categorias d
on a.codigo_categoria = d.codigo_categoria
where a.codigo_producto = 41;

select caracteristica,descripcion from caracteristicas_producto where codigo_producto = 41;

select count(imagen_producto) from imagen_x_producto where codigo_producto = 41;

select count(caracteristica) from caracteristicas_producto where codigo_producto = 41;

select a.username,a.imagen_perfil,count(b.codigo_vendedor) as seguidores
from usuarios a
left join vendedores_guardados b
on a.codigo_usuario = b.codigo_vendedor
where a.codigo_usuario = 41
group by a.username,a.imagen_perfil;

select a.username,a.descripcion,to_char(a.fecha_creacion,'DD-Month-YYYY') as fecha_creacion,b.pais from usuarios a left join paises b on a.codigo_pais = b.codigo_pais where a.codigo_usuario = 41;

select to_char(sysdate,'DD-Month-YYYY')
from dual;

select min(b.imagen_producto) as imagen_producto, a.codigo_producto,a.nombre_producto,a.precio from productos a left join imagen_x_producto b on a.codigo_producto = b.codigo_producto where a.usuario_vendedor = 21 group by a.nombre_producto,a.precio,a.codigo_producto;

select count(codigo_producto) as cantidad from productos where usuario_vendedor = 41;

select count(codigo_producto) as cantidad from lista_de_favoritos where codigo_usuario = 41;

select a.codigo_producto, min(c.imagen_producto) as imagen_producto, b.nombre_producto, d.estado, b.precio, e.username from lista_de_favoritos a left join productos b on a.codigo_producto = b.codigo_producto left join imagen_x_producto c on a.codigo_producto = c.codigo_producto left join estados_producto d on b.codigo_estado = d.codigo_estado left join usuarios e on b.usuario_vendedor = e.codigo_usuario where a.codigo_usuario = 41 group by a.codigo_producto,b.nombre_producto,d.estado,b.precio,e.username;

select count(codigo_usuario) as favorito from lista_de_favoritos where codigo_usuario = 41 and codigo_producto = 61;

delete from lista_de_favoritos where codigo_usuario = 21 and codigo_producto = 10;

select count(codigo_producto) as carrito from carrito where codigo_comprador = 20 and codigo_producto = 41;

select a.codigo_producto, min(c.imagen_producto) as imagen_producto, b.nombre_producto,d.estado, b.precio, e.username,e.codigo_usuario,f.dias_devolucion from carrito a  left join productos b on a.codigo_producto = b.codigo_producto  left join imagen_x_producto c on a.codigo_producto = c.codigo_producto  left join estados_producto d on b.codigo_estado = d.codigo_estado  left join usuarios e  on b.usuario_vendedor = e.codigo_usuario left join devoluciones f on b.codigo_devolucion = f.codigo_devolucion where a.codigo_comprador = 1 group by a.codigo_producto,b.nombre_producto,d.estado,b.precio,e.username,e.codigo_usuario,f.dias_devolucion;

select count(codigo_producto) as cantidad from carrito where codigo_comprador = 1;