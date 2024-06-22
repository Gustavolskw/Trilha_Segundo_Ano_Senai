package br.com.coldigogeladeiras.bd;

import java.sql.*;

public class SqlConnection {
	private Connection conn;


	public Connection startConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
	        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mercado?" +
	                "user=root&password=root&serverTimezone=UTC");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;

	}
	
	public void closeConn() {
		try {
			conn.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
