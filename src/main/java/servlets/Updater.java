package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import main.SQL;

import java.io.IOException;

import org.mindrot.jbcrypt.BCrypt;

/**
 * Servlet implementation class Updater
 */
@WebServlet("/Updater")
public class Updater extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Updater() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		SQL sql = new SQL();
		int code = Integer.parseInt(request.getParameter("code"));
		int userID = Integer.parseInt(request.getParameter("userID"));
		if(code == 1) {
			String column = request.getParameter("column");
			String data = request.getParameter("data");
			sql.updateCredentials(data, userID,column);
		}else if(code == 2) {
			String data = BCrypt.hashpw(request.getParameter("data"),BCrypt.gensalt(12));
			sql.updatePassword(data, userID);
			
		}else if(code == 3) {
			String[] data = request.getParameter("data").replace("[", "").replace("]", "").replace("\"", "").split(",");
			sql.updatePersonalInfo(data, userID);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
