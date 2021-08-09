package com.ejb.restapi.models.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.ejb.restapi.models.Tasks;
import com.ejb.restapi.models.User;

@Stateless
public class TasksDAO {

	@Inject
	UserDAO userdao;
	@PersistenceContext(unitName = "todoapplication-pu")
	private EntityManager entityManager;

	public Tasks addTask(Tasks task) {
		entityManager.persist(task);
		return task;
	}

	public List<Tasks> getAllTasksOfUser(int user_id) {
		//return entityManager.createNamedQuery("Tasks.findAll", Tasks.class).getResultList();
		User find= entityManager.find(User.class, user_id);
    	List list=null;
        
        list=entityManager.createQuery("select a from Tasks a  where a.user=:user_id")
        		.setParameter("user_id", find).getResultList();
        return list;
	}

	public void deleteTask(int taskId) {
		entityManager.remove(entityManager.find(Tasks.class, taskId));
	}

	public Tasks getTaskByTaskId(int taskId) {
		Tasks task = entityManager.find(Tasks.class, taskId);
		return task;
	}

	public Tasks updateTask(Tasks taskUpdated) {
		if (!entityManager.contains(taskUpdated)) {
			taskUpdated = entityManager.merge(taskUpdated);
		}
		return taskUpdated;
	}

}
