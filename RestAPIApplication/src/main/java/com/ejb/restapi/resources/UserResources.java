package com.ejb.restapi.resources;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ejb.restapi.models.User;
import com.ejb.restapi.models.dao.UserDAO;

@RequestScoped
@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResources {

	@Inject
	UserDAO userDAO;

	@GET
	public Response getAllUsers() {
		return Response.ok(userDAO.getAllUsers()).build();
	}

	@POST
	public Response addUser(User user) {
		return Response.ok(userDAO.addUser(user)).build();
	}

	@GET
	@Path("{userId}")
	public Response getUserById(@PathParam("userId") int userId) {
		return Response.ok(userDAO.getUserById(userId)).build();
	}

	@DELETE
	@Path("{userId}")
	public Response deleteUser(@PathParam("userId") int userId) {
		User user = userDAO.getUserById(userId);
		
		return Response.ok(userDAO.deleteUser(user)).build();
	}
	
	@PUT
    @Path("{userId}")
    public Response updateUser(@PathParam("userId") int userId,
                                    User userUpdated) {
    	
        User u=userDAO.getUserById(userId);
        u.setFirstName(userUpdated.getFirstName());
        u.setLastName(userUpdated.getLastName());
        u.setEmail(userUpdated.getEmail());
        u.setGender(userUpdated.getGender());
        u.setPassword(userUpdated.getPassword());
        u.setRegistrationDate(userUpdated.getRegistrationDate());
        u.setActivationDate(userUpdated.getActivationDate());
        u.setActivationStatus(userUpdated.isActivationStatus());
        u.setRole(userUpdated.getRole());
        
		userDAO.updateUser(u);

		return Response.ok().build();
    }
}
