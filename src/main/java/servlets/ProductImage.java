package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Servlet implementation class ProductImage
 */
@WebServlet("/ProductImage")
@MultipartConfig
public class ProductImage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProductImage() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//No entiendo (Obtener la parte del archivo)
		Part filepart = request.getPart("url");
		//No entiendo (Obtener nombre original)
		String fileName = Paths.get(filepart.getSubmittedFileName()).getFileName().toString();
		//Entiendo (Ruta donde se guardara)
		String uploadPath = getServletContext().getRealPath("") + File.separator + "assets/uploads";
		File uploadDir = new File(uploadPath);
		if (!uploadDir.exists()) uploadDir.mkdirs();	
		//No entiendo (Guardar archivo)
		String filePath = uploadPath + File.separator + fileName;
		try (InputStream fileContent = filepart.getInputStream()) {
			Files.copy(fileContent, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
		}
			    
		//Entiendo (Responder con la ruta)
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		out.print(String.format("{\"imgRoute\": \"assets/uploads/%s\"}",fileName));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
