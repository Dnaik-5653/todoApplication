package com.ejb.restapi.resources;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@ApplicationPath("/rest")
public class ApplicationConfig extends Application{
	@GET
	@Path("/")
	@Produces({MediaType.TEXT_PLAIN})
	public Response index() {
	    return Response
	      .status(200)
	      .header("Access-Control-Allow-Origin", "*")
	      .header("Access-Control-Allow-Credentials", "true")
	      .header("Access-Control-Allow-Headers",
	        "origin, content-type, accept, authorization")
	      .header("Access-Control-Allow-Methods", 
	        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	      .entity("")
	      .build();
	}
}
