import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
const TaskApp = () => {
 const [tasks, setTasks] = useState([]);
 const [newTask, setNewTask] = useState({
 title: '',
 assignedTo: '',
 status: 'Not Started',
 dueDate: '',
 priority: 'Normal',
 comments: ''
 });
 const [editId, setEditId] = useState(null);
 const [showModal, setShowModal] = useState(false);
 useEffect(() => {
 fetchTasks();
 }, []);
 const fetchTasks = async () => {
 const response = await axios.get('http://localhost:8080/tasks');
 setTasks(response.data);
 };
 const handleInputChange = (e) => {
 const { name, value } = e.target;
 setNewTask({ ...newTask, [name]: value });
 };
 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => {
 setNewTask({
 title: '',
 assignedTo: '',
 status: 'Not Started',
 dueDate: '',
 priority: 'Normal',
 comments: ''
 });
 setEditId(null);
 setShowModal(false);
 };
 //save task
 const saveTask = async () => {
 if (editId) {
 await axios.put(`http://localhost:8080/tasks/${editId}`, newTask);
 } else {
 await axios.post('http://localhost:8080/tasks', newTask);
 }
 handleCloseModal();
 fetchTasks();
 };
 const editTask = (task) => {
 setEditId(task.id);
 setNewTask(task);
 setShowModal(true);
 };
 const deleteTask = async (id) => {
 await axios.delete(`http://localhost:8080/tasks/${id}`);
 fetchTasks();
 };
 return (
 <div className="container mt-5">
 <h2 className="mb-4">Tasks</h2>
 <Button variant="warning" onClick={handleShowModal}>New Task</Button>
 <table className="table table-striped mt-3">
 <thead className="table-dark">
 <tr>
 <th>Title</th>
 <th>Assigned To</th>
 <th>Status</th>
 <th>Due Date</th>
 <th>Priority</th>
 <th>Comments</th>
 <th>Actions</th>
 </tr>
 </thead>
 <tbody>
 {tasks.map((task) => (
 <tr key={task.id}>
 <td>{task.title}</td>
 <td>{task.assignedTo}</td>
 <td>{task.status}</td>
 <td>{task.dueDate}</td>
 <td>{task.priority}</td>
 <td>{task.comments}</td>
 <td>
 <Button variant="info" size="sm" onClick={() => editTask(task)}>Edited</Button>{' '}
 <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Deleted</Button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 <Modal show={showModal} onHide={handleCloseModal}>
 <Modal.Header closeButton>
 <Modal.Title>{editId ? 'Edit Task' : 'New Task'}</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form>
 <Form.Group className="mb-2">
 <Form.Label>Title</Form.Label>
 <Form.Control name="title" value={newTask.title} onChange={handleInputChange} />
 </Form.Group>
 <Form.Group className="mb-2">
 <Form.Label>Assigned To</Form.Label>
 <Form.Control name="assignedTo" value={newTask.assignedTo} onChange={handleInputChange} />
 </Form.Group>
 <Form.Group className="mb-2">
 <Form.Label>Status</Form.Label>
 <Form.Select name="status" value={newTask.status} onChange={handleInputChange}>
 <option>Not Started yet</option>
 <option>In Progress</option>
 <option>Completed now </option>
 </Form.Select>
 </Form.Group>
 <Form.Group className="mb-2">
 <Form.Label>Due Date</Form.Label>
 <Form.Control type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange} />
 </Form.Group>
 <Form.Group className="mb-2">
 <Form.Label>Priority</Form.Label>
 <Form.Select name="priority" value={newTask.priority} onChange={handleInputChange}>
 <option>Low</option>
 <option>Normal</option>
 <option>High</option>
 </Form.Select>
 </Form.Group>
 <Form.Group className="mb-2">
 <Form.Label>Comments</Form.Label>
 <Form.Control as="textarea" name="comments" rows={3} value={newTask.comments}
onChange={handleInputChange} />
 </Form.Group>
 </Form>
 </Modal.Body>
 <Modal.Footer>
 <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
 <Button variant="primary" onClick={saveTask}>Save</Button>
 </Modal.Footer>
 </Modal>
 </div>
 );
};
export default TaskApp;