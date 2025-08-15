package main;

import org.mindrot.jbcrypt.BCrypt;

public class Main {

	public static void main(String[] args) {
		//SQL sql = new SQL();
		//System.out.println(sql.g());
		//sql.connect("Select codigo_categoria,nombre_categoria from categorias");
		
		 // for(int i=0;i<array.length;i++) { System.out.println(array[i]); }
		 
		//String[] array = sql.getArray(1,"codigo_categoria");
		//String result = "{ \"categories\": "+Arrays.toString(array)+"}";
		//String[] array = {"ieescoto",""};
		//sql.login(array);
		System.out.println(BCrypt.hashpw("Changeme_0", BCrypt.gensalt(12)));
	}

}
