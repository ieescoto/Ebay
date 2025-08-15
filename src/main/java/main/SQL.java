package main;

import java.sql.*;
import java.util.Arrays;

import exceptions.UserAlreadyInUseException;
import jakarta.servlet.http.HttpServletResponse;

public class SQL {
	private String url;
	private String user;
	private String password;
	private Connection con;

	public SQL() {
		this.url = "jdbc:oracle:thin:@//localhost:1521/xe";
		this.user = "C##EBAY";
		this.password = "1234";
		try {
			Class.forName("oracle.jdbc.OracleDriver");
			this.con = DriverManager.getConnection(url, user, password);
		} catch (SQLException|ClassNotFoundException e) {
			System.out.println("No conecto");
			e.printStackTrace();
		}
	}
	
	//Metodo que devuelve el arreglo de las subcategorias
	public String[] getArray(int id, String column) {
		String query = String.format("Select %s from categorias where categoria_padre = %s",column ,id+"");
		StringBuilder array = new StringBuilder();
		int amount = this.getAmount(id);
		int counter = 0;
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				array.append("\""+result.getString(column)+"\"");
				counter++;
				if (counter != amount) {
					array.append(";");
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return array.toString().split(";");
	}
	
	//Metodo que devuelve la cantidad de registros
	private int getAmount(int id) {
		int amount = 0;
		String query = String.format(
				"Select count(nombre_categoria) as cantidad from categorias where categoria_padre = %s", id + "");
		Statement statement;
		try {
			statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	//Metodo que devuelve el json de las categorias
	public String getCategoriesJSON(int id) {
		StringBuilder json = new StringBuilder("{");
		json.append("\"categories\":"+Arrays.toString(this.getArray(id,"nombre_categoria"))+",");
		json.append("\"id\":"+Arrays.toString(this.getArray(id,"codigo_categoria"))+",");
		json.append("\"url\": "+Arrays.toString(this.getArray(id,"imagen"))+"}");
		return json.toString();
	}
	
	//Metodo que introduce los datos del usuario a la bd
	public void createAccount(String[] array,HttpServletResponse response) {
		String query = "insert into usuarios(codigo_usuario,nombre_usuario,apellido_usuario,username,correo_electronico,contraseña,codigo_pais,numero_telefono,direccion,codigo_tipo_usuario,fecha_creacion)values(sq_codigo_usuario.nextval,?,?,?,?,?,?,?,?,1,sysdate)";
		
		
		try {
			Validator.userExist(array[2],array[3], con);
			PreparedStatement statement = con.prepareStatement(query);
			statement.setString(1, array[0]);
			statement.setString(2, array[1]);
			statement.setString(3, array[2]);
			statement.setString(4, array[3]);
			statement.setString(5, array[4]);
			statement.setInt(6, Integer.parseInt(array[5]));
			statement.setString(7, array[6]);
			statement.setString(8, array[7]);
			statement.executeUpdate();
		} catch (SQLException | UserAlreadyInUseException e) {
			response.setStatus(401);
			e.printStackTrace();
		}
	}
	
	//Metodo que valida los datos para iniciar sesion y devuelve un json con todos los datos del usuario
	public String login(String[] data) {
		if(Validator.userInBD(data[0],data[1] ,con)) {
			return this.getUserInfo(data[0]);
		}
		return null;
	}
	
	//Metodo que arma el json con todos los datos del usuario
	private String getUserInfo(String name) {
		String query = String.format("Select A.codigo_usuario,A.username,A.nombre_usuario,A.apellido_usuario,A.correo_electronico,A.numero_telefono,A.direccion,A.valoracion_total,A.imagen_perfil,A.codigo_pais,B.pais from usuarios A left join paises B on A.codigo_pais = B.codigo_pais where username = '%s' or correo_electronico = '%s'",name,name);
		StringBuilder json = new StringBuilder("{");
		String data = "";
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			data = String.format("\"codigo\": %s, \"username\": \"%s\",\"nombre\": \"%s\",\"apellido\": \"%s\",\"correo_electronico\": \"%s\",\"numero_telefono\": \"%s\",\"direccion\": \"%s\",\"valoracion\": %s,\"foto\": \"%s\",\"codigo_pais\": %s,\"pais\": \"%s\"",result.getInt("codigo_usuario"),result.getString("username"),result.getString("nombre_usuario"), result.getString("apellido_usuario"), result.getString("correo_electronico"),result.getString("numero_telefono"),result.getString("direccion").replace(";", ","),result.getFloat("valoracion_total"),result.getString("imagen_perfil"),result.getInt("codigo_pais"),result.getString("pais"));
			
			json.append(data);
			json.append("}");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//Actualizar pais
	public void updateCountry(int userID,int countryID) {
		String query = String.format("update usuarios set codigo_pais = %s where codigo_usuario = %s", countryID,userID);
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar datos");
			e.printStackTrace();
		}
	}
	
	//Actualizar credenciales
	public void updateCredentials(String data, int userID,String column) {
		String query = String.format("update usuarios set %s = '%s' where codigo_usuario = %s", column,data,userID);
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar credenciales");
			e.printStackTrace();
		}
	}
	
	//Actualizar datos personales
	public void updatePersonalInfo(String[] array, int userID){
		String query = String.format("update usuarios set nombre_usuario = '%s',apellido_usuario = '%s',direccion = '%s' where codigo_usuario = %s", array[0],array[1],array[2],userID);
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar datos personales");
			e.printStackTrace();
		}
	}
	
	//Actualizar contraseña
	public void updatePassword(String pass, int userID) {
		String query = String.format("update usuarios set contraseña = '%s' where codigo_usuario = %s", pass,userID);
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar contraseña");
			e.printStackTrace();
		}
	}
	
	/*
	 * // public String g() { String query =
	 * "select nombre_categoria from categorias where categoria_padre is not null";
	 * StringBuilder x = new StringBuilder(); try { Statement statement =
	 * con.createStatement(); ResultSet result = statement.executeQuery(query);
	 * 
	 * while (result.next()) { x.append(result.getString("nombre_categoria"));
	 * x.append("\n"); } } catch (SQLException e) { e.printStackTrace(); }
	 * 
	 * return x.toString(); }
	 */
	
	//Metodo que agrega un producto a la tabla de Productos
	public void createProduct(int categoryCode, int sellerID, String name, String description, float productPrice, int conditionCode, float shippingPrice, int returnCode, int quantity, String brand, String model) {
		String query = "insert into productos(codigo_producto,codigo_categoria,usuario_vendedor,nombre_producto,descripcion,precio,codigo_estado,envio_precio,codigo_devolucion,fecha_publicacion,cantidad_producto,marca,modelo)values(sq_codigo_producto.nextval,?,?,?,?,?,?,?,?,sysdate,?,?,?)";
		
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, categoryCode);
			statement.setInt(2, sellerID);
			statement.setString(3, name);
			statement.setString(4, description);
			statement.setFloat(5, productPrice);
			statement.setInt(6, conditionCode);
			statement.setFloat(7, shippingPrice);
			statement.setInt(8, returnCode);
			statement.setInt(9, quantity);
			statement.setString(10, brand);
			statement.setString(11, model);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al agregar el producto");
			e.printStackTrace();
		}
	}
	
	//Actualizar de comprador a vendedor al usuario
	public void updateUserType(int userID) {
		String query = String.format("update usuarios set codigo_tipo_usuario = 2 where codigo_usuario = %s",userID);
		
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar tipo usuario");
			e.printStackTrace();
		}
	}
	
	//Metodo que obtiene el ultimo codigo de producto
	private int getProductCode() {
		String query = "select codigo_producto from productos order by codigo_producto desc";
		int productCode = 0;
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			productCode = result.getInt("codigo_producto");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return productCode;
	}
	
	//Metodo que agrega las caracteristicas del producto a la BD
	public void createProductCaracteristics(String[] name,String[] value) {
		int productCode = this.getProductCode();
		String query = "insert into caracteristicas_producto(codigo_caracteristica,codigo_producto,caracteristica,descripcion) values(sq_codigo_caracteristica.nextval,?,?,?)";
		for(int i =0;i<name.length;i++) {
			try {
				PreparedStatement statement = con.prepareStatement(query);
				statement.setInt(1, productCode);
				statement.setString(2, name[i]);
				statement.setString(3, value[i]);
				statement.executeUpdate();
			}catch(SQLException e) {
				System.out.println("Fallo al agregar caracteristicas");
				e.printStackTrace();
			}
			
		}
	}
	
	//Metodo que agrega las rutas de las imagenes del producto a la BD
	public void createProductImage(String[] url) {
		int productCode = this.getProductCode();
		String query = " insert into imagen_x_producto(codigo_producto,imagen_producto) values(?,?)";
		for(int i =0;i<url.length;i++) {
			try {
				PreparedStatement statement = con.prepareStatement(query);
				statement.setInt(1, productCode);
				statement.setString(2, url[i]);
				statement.executeUpdate();
			}catch(SQLException e) {
				System.out.println("Fallo al agregar imagenes");
				e.printStackTrace();
			}
			
		}
	}
	
	//Metodo que devuelve los productos para la informacion del producto
	public String getUserProducts(int userCode) {
		String query = String.format("Select a.nombre_producto,a.codigo_producto, min(b.imagen_producto) as imagen_producto from productos a left join imagen_x_producto b on a.codigo_producto = b.codigo_producto where a.usuario_vendedor = %s group by a.nombre_producto,a.codigo_producto order by a.codigo_producto",userCode);
		int amount = this.getUserProductsAmount(userCode);
		int counter = 0;
		StringBuilder json = new StringBuilder("{ \"products\" : [");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				json.append(String.format("{ \"title\": \"%s\" ,\"url\": \"%s\",\"code\":%s}",result.getString("nombre_producto"),result.getString("imagen_producto"),result.getInt("codigo_producto")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			}
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return json.toString();
	}
	
	//Metodo que devuelve la cantidad de productos por un vendedor
	private int getUserProductsAmount(int userCode) {
		int amount = 0;
		String query = String.format(
				"Select count(nombre_producto) as cantidad from productos where usuario_vendedor = %s",userCode);
		try {
			Statement statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	//Obtener todos los productos por palabra clave
	public String getProducts(String searchValue) {
		String query = String.format("select a.codigo_producto,a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,min(d.imagen_producto) as imagen_producto from productos a left join usuarios b on a.usuario_vendedor = b.codigo_usuario left join estados_producto c on a.codigo_estado = c.codigo_estado left join imagen_x_producto d on a.codigo_producto = d.codigo_producto where LOWER(nombre_producto) LIKE LOWER('%%%s%%') group by a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,a.codigo_producto",searchValue);
		int counter = 0;
		int amount = this.getProductsAmount(searchValue);
		StringBuilder json = new StringBuilder("{ \"products\": [");		
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				json.append(String.format("{ \"image\":\"%s\", \"title\": \"%s\", \"price\":%s, \"shipping\": %s, \"condition\":\"%s\", \"seller\": \"%s\",\"code\":%s }", result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getFloat("envio_precio"),result.getString("estado"),result.getString("username"),result.getInt("codigo_producto")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			}
			
			json.append("] }");
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return json.toString();
	}
	
	//Metodo que obtiene la cantidad de productos buscados por palabra clave
	private int getProductsAmount(String searchValue) {
		int amount = 0;
		String query = String.format("Select count(nombre_producto) as cantidad from productos where LOWER(nombre_producto) LIKE LOWER('%%%s%%')",searchValue);
		try {
			Statement statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	//Metodo que obtiene la cantidad de productos buscados por categoria
	public String getProductsByCategory(int categoryID) {
		String query = String.format("select a.codigo_producto,a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,min(d.imagen_producto) as imagen_producto from productos a left join usuarios b on a.usuario_vendedor = b.codigo_usuario left join estados_producto c on a.codigo_estado = c.codigo_estado left join imagen_x_producto d on a.codigo_producto = d.codigo_producto where a.codigo_categoria = %s group by a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,a.codigo_producto",categoryID);
		int counter = 0;
		int amount = this.getProductsAmountByCategorie(categoryID);
		StringBuilder json = new StringBuilder("{ \"products\": [");		
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				json.append(String.format("{ \"image\":\"%s\", \"title\": \"%s\", \"price\":%s, \"shipping\": %s, \"condition\":\"%s\", \"seller\": \"%s\",\"code\":%s }", result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getFloat("envio_precio"),result.getString("estado"),result.getString("username"),result.getInt("codigo_producto")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			}
			
			json.append("] }");
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return json.toString();
	}
	
	//Obtener todos los productos por cataegoria
	private int getProductsAmountByCategorie(int categoryID) {
		int amount = 0;
		String query = String.format("Select count(nombre_producto) as cantidad from productos where codigo_categoria = %s",categoryID);
		try {
			Statement statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	//Metodo para obtener la informacion del producto
	public String getProductInfo(int productID) {
		String query = String.format("select b.imagen_perfil,a.nombre_producto,b.username,b.codigo_usuario,NVL(b.valoracion_total,0) as valoracion_total,a.precio,c.estado,a.cantidad_producto,a.marca,a.modelo,d.nombre_categoria from productos a left join usuarios b on a.usuario_vendedor = b.codigo_usuario left join estados_producto c on a.codigo_estado = c.codigo_estado left join categorias d on a.codigo_categoria = d.codigo_categoria where a.codigo_producto = %s"
,productID);
		StringBuilder json = new StringBuilder("\"info\": {");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"title\": \"%s\", \"username\": \"%s\",\"rating\": %s,\"price\": %s,\"condition\": \"%s\",\"quantity\": %s,\"model\": \"%s\", \"brand\": \"%s\",\"category\": \"%s\", \"sellerCode\": %s,\"profilePic\":\"%s\"",result.getString("nombre_producto"),result.getString("username"),result.getFloat("valoracion_total"), result.getFloat("precio"), result.getString("estado"),result.getInt("cantidad_producto"),result.getString("modelo"),result.getString("marca"),result.getString("nombre_categoria"),result.getInt("codigo_usuario"),result.getString("imagen_perfil")));
			
			json.append("},");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//Metodo para obtener las imagenes del producto
	public String getProductImages(int productID) {
		String query = String.format("select imagen_producto from imagen_x_producto where codigo_producto = %s" ,productID);
		StringBuilder json = new StringBuilder("\"images\": [");
		int counter = 0;
		int amount = this.getAmountOfProduct("imagen_x_producto", "imagen_producto", productID);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append("\""+result.getString("imagen_producto")+"\"");
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
							
			json.append("],");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//Metodo para obtener las caracteristicas del producto
	public String getProductCharacteristics(int productID) {
		String query = String.format("select caracteristica,descripcion from caracteristicas_producto where codigo_producto = %s" ,productID);
		StringBuilder json = new StringBuilder("\"characteristics\": [");
		int counter = 0;
		int amount = this.getAmountOfProduct("caracteristicas_producto", "caracteristica", productID);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append(String.format("{\"characteristic\": \"%s\", \"value\": \"%s\" }",result.getString("caracteristica"),result.getString("descripcion")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
							
			json.append("]");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	
	private int getAmountOfProduct(String table,String column,int productID) {
		int amount = 0;
		String query = String.format("select count(%s) as cantidad from %s where codigo_producto = %s",column,table,productID);
		try {
			Statement statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	public String getSellerHeaderInfo(int sellerCode) {
		String query = String.format("with productos_comprados as(select codigo_vendedor,sum(cantidad_comprado) as productos_vendidos from historial_compras where codigo_vendedor = %s group by codigo_vendedor) select a.username,a.imagen_perfil,count(b.codigo_vendedor) as seguidores, c.productos_vendidos from usuarios a  left join vendedores_guardados b  on a.codigo_usuario = b.codigo_vendedor left join productos_comprados c on a.codigo_usuario = c.codigo_vendedor where a.codigo_usuario = %s group by a.username,a.imagen_perfil,c.productos_vendidos" ,sellerCode,sellerCode);
		StringBuilder json = new StringBuilder("{");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"profilePic\": \"%s\", \"username\": \"%s\",\"followers\": %s,\"sellProducts\": %s",result.getString("imagen_perfil"),result.getString("username"),result.getInt("seguidores"),result.getInt("productos_vendidos")));
			
			json.append("}");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public String getSellerAboutIt(int sellerCode) {
		String query = String.format("select a.username,a.descripcion,to_char(a.fecha_creacion,'DD-Month-YYYY') as fecha_creacion,b.pais from usuarios a left join paises b on a.codigo_pais = b.codigo_pais where a.codigo_usuario = %s",sellerCode);
		StringBuilder json = new StringBuilder("{");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"description\": \"%s\", \"username\": \"%s\",\"date\": \"%s\",\"country\": \"%s\"",result.getString("descripcion"),result.getString("username"),result.getString("fecha_creacion").replace("-", " "),result.getString("pais")));
			
			json.append("}");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public String getSellerProducts(int sellerCode) {
		String query = String.format("select min(b.imagen_producto) as imagen_producto,a.codigo_producto, a.nombre_producto,a.precio from productos a left join imagen_x_producto b on a.codigo_producto = b.codigo_producto where a.usuario_vendedor = %s group by a.nombre_producto,a.precio,a.codigo_producto",sellerCode);
		StringBuilder json = new StringBuilder("{ \"products\": [");
		int counter = 0;
		int amount = this.getAmountOfSellerProduct(sellerCode);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append(String.format("{\"image\": \"%s\", \"title\": \"%s\",\"price\": %s,\"productID\": %s}",result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getInt("codigo_producto")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
		
	}
	
	private int getAmountOfSellerProduct(int sellerID) {
		int amount = 0;
		String query = String.format("select count(codigo_producto) as cantidad from productos where usuario_vendedor = %s",sellerID);
		try {
			Statement statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	public void setFavoriteProduct(int userID, int productID) {
		String query = "insert into lista_de_favoritos (codigo_usuario,codigo_producto) values(?,?)";
		
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setInt(2, productID);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al agregar el producto a favoritos");
			e.printStackTrace();
		}
	}
	
	public String getUserFavorites(int userID) {
		String query = String.format("select a.codigo_producto, min(c.imagen_producto) as imagen_producto, b.nombre_producto, d.estado, b.precio, e.username,e.codigo_usuario from lista_de_favoritos a left join productos b on a.codigo_producto = b.codigo_producto left join imagen_x_producto c on a.codigo_producto = c.codigo_producto left join estados_producto d on b.codigo_estado = d.codigo_estado left join usuarios e on b.usuario_vendedor = e.codigo_usuario where a.codigo_usuario = %s group by a.codigo_producto,b.nombre_producto,d.estado,b.precio,e.username,e.codigo_usuario",userID);
		StringBuilder json = new StringBuilder("{ \"products\": [");
		int counter = 0;
		String amountQuery = String.format("select count(codigo_producto) as cantidad from lista_de_favoritos where codigo_usuario = %s",userID);
		int amount = this.getGenericAmount(amountQuery);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append(String.format("{\"image\": \"%s\", \"title\": \"%s\",\"price\": %s,\"productID\": %s, \"condition\": \"%s\", \"username\":\"%s\",\"userID\":%s}",result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getInt("codigo_producto"),result.getString("estado"),result.getString("username"),result.getInt("codigo_usuario")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	private int getGenericAmount(String query) {
		int amount = 0;
		try {
			Statement statement = con.createStatement();
			ResultSet amountOfCategories = statement.executeQuery(query);
			amountOfCategories.next();
			amount = amountOfCategories.getInt("cantidad");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return amount;
	}
	
	public String checkFavorites(int userID, int productID) {
		String query = String.format("select count(codigo_usuario) as favorito from lista_de_favoritos where codigo_usuario = %s and codigo_producto = %s",userID,productID);
		StringBuilder json = new StringBuilder("{");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"isFavorited\": %s",result.getString("favorito")));
			
			json.append("}");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public void deleteFavorite(int userID, int productID) {
		String query =  "delete from lista_de_favoritos where codigo_usuario = ? and codigo_producto = ?";
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setInt(2, productID);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void addToCart(int userID, int productID) {
		String query = "insert into carrito(codigo_comprador,codigo_producto,cantidad) values(?,?,1)";
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setInt(2, productID);
			statement.executeUpdate();
		}catch(SQLException e) {
			System.out.println("Fallo al agregar al carrito");
			e.printStackTrace();
		}
	}
	
	public String checkCart(int userID, int productID) {
		String query = String.format("select count(codigo_producto) as carrito from carrito where codigo_comprador = %s and codigo_producto = %s",userID,productID);
		StringBuilder json = new StringBuilder("{");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"isInCart\": %s",result.getString("carrito")));
			
			json.append("}");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public String getCartProducts(int userID) {
		String query = String.format("select a.codigo_producto, min(c.imagen_producto) as imagen_producto, b.nombre_producto,d.estado, b.precio, e.username,e.codigo_usuario,f.dias_devolucion,e.imagen_perfil,b.envio_precio,b.cantidad_producto,a.cantidad from carrito a  left join productos b on a.codigo_producto = b.codigo_producto  left join imagen_x_producto c on a.codigo_producto = c.codigo_producto  left join estados_producto d on b.codigo_estado = d.codigo_estado  left join usuarios e  on b.usuario_vendedor = e.codigo_usuario left join devoluciones f on b.codigo_devolucion = f.codigo_devolucion where a.codigo_comprador = %s group by a.codigo_producto,b.nombre_producto,d.estado,b.precio,e.username,e.codigo_usuario,f.dias_devolucion,e.imagen_perfil,b.envio_precio,b.cantidad_producto,a.cantidad",userID);
		StringBuilder json = new StringBuilder("{ \"products\": [");
		int counter = 0;
		String amountQuery = String.format("select count(codigo_producto) as cantidad from carrito where codigo_comprador = %s",userID);
		int amount = this.getGenericAmount(amountQuery);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append(String.format("{\"image\": \"%s\", \"title\": \"%s\",\"price\": %s,\"productID\": %s, \"condition\": \"%s\", \"username\":\"%s\",\"userID\":%s,\"return\":%s,\"profilePic\":\"%s\",\"shipping\": %s,\"quantity\": %s,\"quantitySelected\": %s}",result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getInt("codigo_producto"),result.getString("estado"),result.getString("username"),result.getInt("codigo_usuario"),result.getInt("dias_devolucion"),result.getString("imagen_perfil"),result.getFloat("envio_precio"),result.getString("cantidad_producto"),result.getInt("cantidad")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public void updateCartQuantity(int quantity,int userID,int productID) {
		String query = String.format("update carrito set cantidad = %s where codigo_comprador = %s and codigo_producto=%s",quantity,userID,productID);
		
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar cantidad");
			e.printStackTrace();
		}
	}
	
	public void deleteCartProduct(int userID,int productID) {
		String query =  "delete from carrito where codigo_comprador = ? and codigo_producto = ?";
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setInt(2, productID);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void setSavedSeller(int userID,int sellerID) {
		String query = "insert into vendedores_guardados(codigo_usuario,codigo_vendedor) values(?,?)";
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setInt(2, sellerID);
			statement.executeUpdate();
		}catch(SQLException e) {
			System.out.println("Fallo al agregar a vendedores guardados");
			e.printStackTrace();
		}
	}
	
	public void deleteSavedSeller(int userID,int sellerID) {
		String query =  "delete from vendedores_guardados where codigo_usuario = ? and codigo_vendedor = ?";
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setInt(2, sellerID);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public String checkSavedSeller(int userID,int sellerID) {
		String query = String.format("select count(codigo_vendedor) as guardado from vendedores_guardados where codigo_usuario = %s and codigo_vendedor = %s",userID,sellerID);
		StringBuilder json = new StringBuilder("{");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"isSaved\": %s",result.getString("guardado")));
			
			json.append("}");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public String getSavedSellers(int userID) {
		String query = String.format("select b.username,b.imagen_perfil,a.codigo_vendedor from vendedores_guardados a left join usuarios b on a.codigo_vendedor = b.codigo_usuario where a.codigo_usuario = %s",userID);
		StringBuilder json = new StringBuilder("{ \"sellers\": [");
		int counter = 0;
		String amountQuery = String.format("select count(codigo_vendedor) as cantidad from vendedores_guardados where codigo_usuario = %s",userID);
		int amount = this.getGenericAmount(amountQuery);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append(String.format("{\"image\": \"%s\", \"username\":\"%s\",\"sellerID\":%s}",result.getString("imagen_perfil"),result.getString("username"),result.getInt("codigo_vendedor")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public void updateUserDescription(String description,String url, int userID) {
		String query = String.format("update usuarios set descripcion = '%s',imagen_perfil = '%s' where codigo_usuario = %s", description,url,userID);
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Fallo al actualizar datos personales");
			e.printStackTrace();
		}
	}
	
	public String getUserDescription(int userID) {
		String query = String.format("select a.imagen_perfil,a.username,a.descripcion,b.pais,to_char(a.fecha_creacion,'dd month yyyy') as fecha_creacion from usuarios a left join paises b on a.codigo_pais = b.codigo_pais where a.codigo_usuario = %s",userID);
		StringBuilder json = new StringBuilder("{");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			json.append(String.format("\"description\": \"%s\",\"creationDate\": \"%s\",\"country\":\"%s\",\"username\":\"%s\",\"profilePic\":\"%s\"",result.getString("descripcion"),result.getString("fecha_creacion"),result.getString("pais"),result.getString("username"),result.getString("imagen_perfil")));
			
			json.append("}");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public void insertCreditCard(String creditCardNumber, String expirationDate, int cVV, String creditCardName, String creditCardLastName, int userID) {
		String query = "insert into pagos_por_usuarios (codigo_pago,codigo_comprador,codigo_formas_pago,numero_tarjeta,fecha_vencimiento,cvv,nombre_titular,apellido_titular) values(sq_codigo_pago.nextval,?,1,?,?,?,?,?)";
		
		
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setString(2, creditCardNumber);
			statement.setString(3, expirationDate);
			statement.setInt(4, cVV);
			statement.setString(5, creditCardName);
			statement.setString(6, creditCardLastName);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertPaypal(String paypalUser, String paypalEmail, int userID) {
String query = "insert into pagos_por_usuarios (codigo_pago,codigo_comprador,codigo_formas_pago,usuario_paypal,correo_paypal) values(sq_codigo_pago.nextval,?,2,?,?)";
		
		
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, userID);
			statement.setString(2, paypalUser);
			statement.setString(3, paypalEmail);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public String getPaymentCards(int userID) {
		String query = String.format("select codigo_pago,codigo_formas_pago,numero_tarjeta,fecha_vencimiento,correo_paypal from pagos_por_usuarios where codigo_comprador = %s",userID);
		StringBuilder json = new StringBuilder("{ \"payment\": [");
		int counter = 0;
		String amountQuery = String.format("select count(codigo_comprador) as cantidad from pagos_por_usuarios where codigo_comprador = %s",userID);
		int amount = this.getGenericAmount(amountQuery);
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			while(result.next()) {
				json.append(String.format("{\"paymentType\": %s, \"creditCardNumber\":\"%s\",\"expirationDate\":\"%s\",\"paypalEmail\":\"%s\",\"paymentID\":%s}",result.getInt("codigo_formas_pago"),result.getString("numero_tarjeta"),result.getString("fecha_vencimiento"),result.getString("correo_paypal"),result.getInt("codigo_pago")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			};
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public void deletePaymentCard(int paymentID) {
		String query =  "delete from pagos_por_usuarios where codigo_pago = ?";
		try {
			PreparedStatement statement = con.prepareStatement(query);
			statement.setInt(1, paymentID);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void setBoughtHistory(int buyerID, String[] productsID, String[] sellersID, String[] quantityBought, String[] subtotal) {
		String query = "insert into historial_compras(codigo_compra,codigo_producto_comprado,codigo_comprador,codigo_vendedor,cantidad_comprado,subtotal) values(sq_codigo_compra.nextval,?,?,?,?,?)";
		for(int i=0;i<productsID.length;i++) {
			try {
				PreparedStatement statement = con.prepareStatement(query);
				statement.setInt(1, Integer.parseInt(productsID[i]));
				statement.setInt(2, buyerID);
				statement.setInt(3, Integer.parseInt(sellersID[i]));
				statement.setInt(4, Integer.parseInt(quantityBought[i]));
				statement.setFloat(5, Float.parseFloat(subtotal[i]));
				statement.executeUpdate();
			}catch(SQLException e) {
				System.out.println("Fallo al agregar caracteristicas");
				e.printStackTrace();
			}
			
		}
	}
	public void deleteAllCartProduct(int buyerID, String[] productsID) {
		String query =  "delete from carrito where codigo_comprador = ? and codigo_producto = ?";
		for(int i=0;i<productsID.length;i++) {
			try {
				PreparedStatement statement = con.prepareStatement(query);
				statement.setInt(1, buyerID);
				statement.setInt(2, Integer.parseInt(productsID[i]));
				statement.executeUpdate();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public void updateProductQuantity(String[] productsID, String[] quantityBought, String[] oldQuantity) {
		String query = "update productos set cantidad_producto = ? where codigo_producto= ?";
		for(int i=0;i<productsID.length;i++) {
			try {
				PreparedStatement statement = con.prepareStatement(query);
				statement.setInt(1,Integer.parseInt(oldQuantity[i])-Integer.parseInt(quantityBought[i]));
				statement.setInt(2,Integer.parseInt(productsID[i]));
				statement.executeUpdate();
			} catch (SQLException e) {
				System.out.println("Fallo al actualizar cantidad");
				e.printStackTrace();
			}
		}
	}
	
	public String getBoughtProducts(int userCode) {
		String query = String.format("Select c.nombre_producto,a.codigo_producto_comprado, min(b.imagen_producto) as imagen_producto from historial_compras a left join imagen_x_producto b on a.codigo_producto_comprado = b.codigo_producto left join productos c on a.codigo_producto_comprado = c.codigo_producto where a.codigo_comprador = %s group by c.nombre_producto,a.codigo_producto_comprado order by a.codigo_producto_comprado",userCode);
		String amountQuery = String.format("select count(DISTINCT codigo_producto_comprado) as cantidad from historial_compras where codigo_comprador = %s", userCode);
		int amount = this.getGenericAmount(amountQuery);
		int counter = 0;
		StringBuilder json = new StringBuilder("{ \"products\" : [");
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				json.append(String.format("{ \"title\": \"%s\" ,\"url\": \"%s\",\"code\":%s}",result.getString("nombre_producto"),result.getString("imagen_producto"),result.getInt("codigo_producto_comprado")));
				counter++;
				if(counter != amount) {
					json.append(",");					
				}
			}
			
			json.append("] }");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return json.toString();
	}
}
