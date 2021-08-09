package com.ejb.restapi.models;

import java.io.Serializable;
import java.time.LocalDate;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="tasks")
@NamedQueries(
{
    @NamedQuery(name = "Tasks.findAll", query = "SELECT t FROM Tasks t"),
})
public class Tasks implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int task_id;
	private String todoName,description,priority;
	private LocalDate startDate,completionDate;
	private boolean status;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonbTransient
	private User user;
	
	
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Tasks() {}
	public Tasks(int task_id, String todoName, String description, String priority, LocalDate startDate,
			LocalDate completionDate, boolean status, User user) {
		super();
		this.task_id = task_id;
		this.todoName = todoName;
		this.description = description;
		this.priority = priority;
		this.startDate = startDate;
		this.completionDate = completionDate;
		this.status = status;
		this.user = user;
	}
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	public String getTodoName() {
		return todoName;
	}
	public void setTodoName(String todoName) {
		this.todoName = todoName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getCompletionDate() {
		return completionDate;
	}
	public void setCompletionDate(LocalDate completionDate) {
		this.completionDate = completionDate;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Tasks [task_id=" + task_id + ", todoName=" + todoName + ", description=" + description + ", priority="
				+ priority + ", startDate=" + startDate + ", completionDate=" + completionDate + ", status=" + status + ", user="
				+ user + "]";
	}
	
}
