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

--Llenado
create table formas_pago (
   codigo_pago number not null,
   tipo_pago   varchar2(50) not null
);

create table historial_compras (
   codigo_compra            number not null,
   codigo_producto_comprado number not null,
   codigo_comprador         number not null,
   codigo_vendedor          number not null,
   fecha_compra             date default sysdate not null,
   cantidad_comprado        number not null,
   subtotal                 float not null
);

create table pagos_por_usuarios (
   codigo_pago        number not null,
   codigo_comprador   number not null,
   codigo_formas_pago number not null,
   numero_tarjeta     varchar2(50),
   fecha_vencimiento  varchar2(100),
   cvv                number,
   nombre_titular     varchar2(100),
   apellido_titular   varchar2(100),
   usuario_paypal     varchar2(100),
   correo_paypal      varchar2(100)
);

create table productos (
   codigo_producto   number not null,
   codigo_categoria  number not null,
   usuario_vendedor  number not null,
   nombre_producto   varchar2(100) not null,
   descripcion       varchar2(1000) not null,
   precio            float not null,
   codigo_estado     number not null,
   envio_precio      float not null,
   codigo_devolucion number not null,
   fecha_publicacion date not null,
   cantidad_producto number not null,
   marca             varchar2(100) not null,
   modelo            varchar2(100) not null
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
   username            varchar2(1000) not null,
   contraseña          varchar2(500) not null,
   nombre_usuario      varchar2(100) not null,
   apellido_usuario    varchar2(100) not null,
   correo_electronico  varchar2(1000) not null,
   numero_telefono     varchar2(100) not null,
   direccion           varchar2(2000) not null,
   codigo_tipo_usuario number default 1 not null,
   valoracion_total    float default 0,
   imagen_perfil       varchar2(1000) default 'assets/img/invitados.jpg',
   codigo_pais         number not null,
   fecha_creacion      date default sysdate not null
);

--Llenable
create table paises (
   codigo_pais number not null,
   pais        varchar(100) not null
);

create table vendedores_guardados (
   codigo_usuario  number not null,
   codigo_vendedor number not null
);

create table lista_de_favoritos (
   codigo_usuario  number not null,
   codigo_producto number not null
);

commit;