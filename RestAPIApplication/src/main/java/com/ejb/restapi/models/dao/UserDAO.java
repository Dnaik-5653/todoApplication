package com.ejb.restapi.models.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.ejb.restapi.models.User;

@Stateless
public class UserDAO {

	@PersistenceContext(unitName = "todoapplication-pu")
	private EntityManager entityManager;

	public List<User> getAllUsers() {
		return entityManager.createNamedQuery("User.findAll", User.class).getResultList();
	}

	public User getUserById(int userId) {
		return entityManager.find(User.class, userId);
	}

	public User addUser(User user) {
		System.out.println(user.getEmail());
		if(user.getEmail().equals("admin@gmail.com"))
		{
			user.setActivationStatus(true);
			user.setRole("Admin");
		}else
		{
			user.setActivationStatus(false);
			user.setRole("User");
		}
		entityManager.persist(user);
		return user;
	}

	public User updateUser(User userUpdated) {
		if (!entityManager.contains(userUpdated)) {
			userUpdated = entityManager.merge(userUpdated);
		}
		return userUpdated;
	}

	public String deleteUser(User user) {
		System.out.println("Delete");
		if (!entityManager.contains(user)) {
			user = entityManager.merge(user);
		}
		entityManager.remove(user);
		return "deleted successfully !";
	}
	
	public User changeStatus(User userUpdated) {
		if (!entityManager.contains(userUpdated)) {
			userUpdated = entityManager.merge(userUpdated);
		}
		return userUpdated;
	}

}
