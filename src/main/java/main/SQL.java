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
		String query = "insert into usuarios(codigo_usuario,nombre_usuario,apellido_usuario,username,correo_electronico,contraseña,codigo_pais,numero_telefono,direccion,codigo_tipo_usuario)values(sq_codigo_usuario.nextval,?,?,?,?,?,?,?,?,1)";
		
		
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
		String query = "insert into productos(codigo_producto,codigo_categoria,usuario_vendedor,nombre_producto,descripcion,precio,codigo_estado,envio_precio,fecha_entrega_temprana,fecha_entrega_tardia,codigo_devolucion,fecha_publicacion,cantidad_producto,marca,modelo)values(sq_codigo_producto.nextval,?,?,?,?,?,?,?,sysdate+7,sysdate+30,?,sysdate,?,?,?)";
		
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
		String query = String.format("select a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,min(d.imagen_producto) as imagen_producto from productos a left join usuarios b on a.usuario_vendedor = b.codigo_usuario left join estados_producto c on a.codigo_estado = c.codigo_estado left join imagen_x_producto d on a.codigo_producto = d.codigo_producto where LOWER(nombre_producto) LIKE LOWER('%%%s%%') group by a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,a.codigo_producto",searchValue);
		int counter = 0;
		int amount = this.getProductsAmount(searchValue);
		StringBuilder json = new StringBuilder("{ \"products\": [");		
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				json.append(String.format("{ \"image\":\"%s\", \"title\": \"%s\", \"price\":%s, \"shipping\": %s, \"condition\":\"%s\", \"seller\": \"%s\" }", result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getFloat("envio_precio"),result.getString("estado"),result.getString("username")));
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
	
	public String getProductsByCategory(int categoryID) {
		String query = String.format("select a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,min(d.imagen_producto) as imagen_producto from productos a left join usuarios b on a.usuario_vendedor = b.codigo_usuario left join estados_producto c on a.codigo_estado = c.codigo_estado left join imagen_x_producto d on a.codigo_producto = d.codigo_producto where a.codigo_categoria = %s group by a.nombre_producto,a.precio,a.envio_precio,b.username,c.estado,a.codigo_producto",categoryID);
		int counter = 0;
		int amount = this.getProductsAmountByCategorie(categoryID);
		StringBuilder json = new StringBuilder("{ \"products\": [");		
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);

			while (result.next()) {
				json.append(String.format("{ \"image\":\"%s\", \"title\": \"%s\", \"price\":%s, \"shipping\": %s, \"condition\":\"%s\", \"seller\": \"%s\" }", result.getString("imagen_producto"),result.getString("nombre_producto"),result.getFloat("precio"),result.getFloat("envio_precio"),result.getString("estado"),result.getString("username")));
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
	
}
