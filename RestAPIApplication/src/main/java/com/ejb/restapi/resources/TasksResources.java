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

import com.ejb.restapi.models.Tasks;
import com.ejb.restapi.models.User;
import com.ejb.restapi.models.dao.TasksDAO;
import com.ejb.restapi.models.dao.UserDAO;


@RequestScoped
@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TasksResources {

	@Inject
	UserDAO userDAO;
	
	@Inject
	TasksDAO taskDAO;
	
	@POST
	@Path("{userId}/tasks")
	public Response addTask(@PathParam("userId") int userId, Tasks task) {
		
		User user = userDAO.getUserById(userId);
		task.setUser(user);
		return Response.ok(taskDAO.addTask(task)).build();
		
	}
	
	@GET
	@Path("{userId}/tasks")
	public Response getAllTasksOfUser(@PathParam("userId") int userId) {
		System.out.println("coming into all tasks");
		System.out.println(taskDAO.getAllTasksOfUser(userId));
		return Response.ok(taskDAO.getAllTasksOfUser(userId)).build();
	}
	
	@DELETE
	@Path("{userId}/tasks/{taskId}")
	public String deleteTask(@PathParam("userId") int userId,@PathParam("taskId") int taskId) {
		Tasks task = taskDAO.getTaskByTaskId(taskId);
		if(task.getUser().getUser_id() == userId) {
			taskDAO.deleteTask(taskId);
			return "deleted succefully";
		}
		else {
			return "This user don't have Any Task ";
		}
		
	}
	
	@GET
	@Path("{userId}/tasks/{taskId}")
	public Response getTaskByTaskId(@PathParam("userId") int userId,@PathParam("taskId") int taskId) {
		return Response.ok(taskDAO.getTaskByTaskId(taskId)).build();
	}
	
	@PUT
    @Path("{userId}/tasks/{taskId}")
    public Response updateTask(@PathParam("userId") int userId,
    		@PathParam("taskId") int taskId,
    		Tasks taskUpdated) {
    	

		User u=  userDAO.getUserById(userId);
    	if(u==null)
    		throw  new NullPointerException("User Not found !");
    	
    	Tasks task=taskDAO.getTaskByTaskId(taskId);
    	task.setTodoName(taskUpdated.getTodoName());
		task.setDescription(taskUpdated.getDescription());
		task.setPriority(taskUpdated.getPriority());
		task.setCompletionDate(taskUpdated.getCompletionDate());
		task.setStartDate(taskUpdated.getStartDate());
		task.setStatus(taskUpdated.isStatus());
		
    	taskDAO.updateTask(task);
    	
		return Response.ok().build();
    }
	}
