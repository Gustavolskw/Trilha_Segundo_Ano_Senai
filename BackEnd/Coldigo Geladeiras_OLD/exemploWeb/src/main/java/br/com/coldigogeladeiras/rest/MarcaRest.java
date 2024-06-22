package br.com.coldigogeladeiras.rest;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import br.com.coldigogeladeiras.modelo.Marca;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import br.com.coldigogeladeiras.bd.*;
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;


@Path("marca")
public class MarcaRest extends UtilRest{


	@GET
	@Path("/buscar")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscar() {
		try {
		List<Marca> listaDeMarcas = new ArrayList<Marca>();
		SqlConnection conect = new SqlConnection();
		Connection conexao = conect.startConnection();
		JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
		listaDeMarcas = jdbcMarca.buscar();
		conect.closeConn();
		return this.buildResponse(listaDeMarcas);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		
	}

}
