package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import main.SQL;

import java.io.IOException;

/**
 * Servlet implementation class Payments
 */
@WebServlet("/Payments")
@MultipartConfig
public class Payments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Payments() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		SQL sql = new SQL();
		String method = request.getParameter("method");
		int userID = Integer.parseInt(request.getParameter("userID"));
		if(method.equals("creditCard")) {
			String creditCardNumber = request.getParameter("creditCardNumber");
			String expirationDate = request.getParameter("expirationDate");
			int CVV = Integer.parseInt(request.getParameter("CVV"));
			String creditCardName = request.getParameter("creditCardName");
			String creditCardLastName = request.getParameter("creditCardLastName");
			sql.insertCreditCard(creditCardNumber,expirationDate,CVV,creditCardName,creditCardLastName,userID);
		}else if(method.equals("paypal")) {
			String paypalUser = request.getParameter("paypalUser");
			String paypalEmail = request.getParameter("paypalEmail");
			sql.insertPaypal(paypalUser,paypalEmail,userID);
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
