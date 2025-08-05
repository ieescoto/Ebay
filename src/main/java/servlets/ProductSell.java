package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import main.SQL;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

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
		
		sql.updateUserType(sellerID);
		sql.createProduct(categoryCode,sellerID,name,description,productPrice,conditionCode,shippingPrice,returnCode,quantity,brand,model);
		sql.createProductCaracteristics(caracteristicName, caracteristicValue);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
