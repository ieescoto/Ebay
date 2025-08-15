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
 * Servlet implementation class BoughtHistory
 */
@WebServlet("/BoughtHistory")
@MultipartConfig
public class BoughtHistory extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BoughtHistory() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		SQL sql = new SQL();
		String[] productsID = request.getParameterValues("products");
		int buyerID = Integer.parseInt(request.getParameter("buyerID"));
		String[] sellersID = request.getParameterValues("sellerID");
		String[] quantityBought = request.getParameterValues("quantityBought");
		String[] subtotal = request.getParameterValues("subtotal");
		sql.setBoughtHistory(buyerID,productsID,sellersID,quantityBought,subtotal);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
