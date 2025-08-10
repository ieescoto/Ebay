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
 * Servlet implementation class ProductSell
 */
@WebServlet("/ProductSell")
@MultipartConfig
public class ProductSell extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProductSell() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		SQL sql = new SQL();
		int categoryCode = Integer.parseInt(request.getParameter("categoryCode"));
		int sellerID = Integer.parseInt(request.getParameter("seller"));
		String name = request.getParameter("title");
		String description = request.getParameter("description");
		float productPrice = Float.parseFloat(request.getParameter("price"));
		int conditionCode = Integer.parseInt(request.getParameter("conditionCode"));
		float shippingPrice = Float.parseFloat(request.getParameter("shippingPrice"));
		int returnCode = Integer.parseInt(request.getParameter("returnCode"));
		int quantity = Integer.parseInt(request.getParameter("quantity"));
		String brand = request.getParameter("brand");
		String model = request.getParameter("model");
		
		String[] caracteristicName = request.getParameterValues("carName");
		String[] caracteristicValue = request.getParameterValues("carValue");
		
		String[] url = request.getParameterValues("url");
		
		sql.updateUserType(sellerID);
		sql.createProduct(categoryCode,sellerID,name,description,productPrice,conditionCode,shippingPrice,returnCode,quantity,brand,model);
		sql.createProductCaracteristics(caracteristicName, caracteristicValue);
		sql.createProductImage(url);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
