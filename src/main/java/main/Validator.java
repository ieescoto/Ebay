package main;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.mindrot.jbcrypt.BCrypt;

import exceptions.IncorrectPasswordException;
import exceptions.UserAlreadyInUseException;

public class Validator {
	public static void userExist(String username, String email, Connection con) throws UserAlreadyInUseException {
		String query = String.format("with nombres_usuario as (select username from usuarios where username = '%s' or correo_electronico = '%s') select count(*) as usado from nombres_usuario", username,email);
		int isUsed = 0;
		
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			isUsed = result.getInt("usado");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		if(isUsed == 1) {
			throw new UserAlreadyInUseException();
		}
	}
	
	public static boolean userInBD(String name, String password , Connection con) {
		String query = String.format("select contraseña from usuarios where username = '%s' or correo_electronico = '%s'", name,name);
		String hash="";
		
		try {
			Statement statement = con.createStatement();
			ResultSet result = statement.executeQuery(query);
			result.next();
			hash = result.getString("contraseña");
			Validator.passwordMatches(password, hash);
		} catch (SQLException  e) {
			System.out.println("Usuario no encontrado");
			e.printStackTrace();
			return false;
		} catch (IncorrectPasswordException e) {
			System.out.println("Contraseña Incorrecta");
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public static void passwordMatches(String password,String hash) throws IncorrectPasswordException {
		if(!BCrypt.checkpw(password, hash)) {
			throw new IncorrectPasswordException();

		}
	}
}
