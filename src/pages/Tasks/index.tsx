import React, {useState, useEffect} from 'react'
import {Table, Badge, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

import moment from 'moment'

import './index.css'

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const history = useHistory()

   useEffect(() => {
     loadTasks()
   }, [])

    const loadTasks = async () => {
        const response = await api.get('/tasks')
        setTasks(response.data)
    }

    const formatDate = (date: Date) => {
      return moment(date).format('DD/MM/YYYY')
    }

    const newTask = () => {
        history.push('tarefas_cadastro')
    }

    const finishedTask = async (id: number) => {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }

    const editTask = (id: number) => {
      history.push(`/tarefas_cadastro/${id}`)
    }

    const viewTask = (id: number) => {
       history.push(`/tarefas/${id}`)
    }

    const deleteTask = async (id: number) => {
      await api.delete(`/tasks/${id}`)
      loadTasks()
    }

    return (
        <div className="container mt-3">
           <div className="task-header">
                <h1>Tasks Page</h1>
                <Button variant="dark" onClick={newTask}>Nova Tarefa</Button>
           </div>
           

            <Table striped bordered hover className="text-center" >
                   <thead>
                     <tr>
                       <th>ID</th>
                       <th>Titulo</th>
                       <th>Data de Atualiação</th>
                       <th>Status</th>
                       <th>Ações</th>
                     </tr>
                   </thead>
                   <tbody>

                      {tasks.map(task => (
                                 <tr key={task.id} >
                                 <td> {task.id} </td>
                                 <td> {task.title} </td>
                                 <td> {formatDate(task.updated_at)}</td>
                                 <td>
                                 <Badge variant={task.finished ? "success" : "warning"}>
                                    {task.finished ? "FINALIZADO" : "PENDENTE"}
                                 </Badge>
                                 </td>
                                 <td>
                                   <Button size="sm" disabled={task.finished}  onClick={() => editTask(task.id)}>
                                        Editar
                                   </Button> {' '}
                                   <Button size="sm"  disabled={task.finished} variant="success" onClick={() => finishedTask(task.id)}>
                                       Finalizar
                                   </Button> {' '}
                                   <Button size="sm" variant="info" onClick={() => viewTask(task.id)} >
                                        Visualizar
                                   </Button> {' '}
                                   <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)} >
                                        Remover
                                   </Button> {' '}
                                 </td>
                               </tr>
                      ))}
                   </tbody>
             </Table> 
        </div>
    )
}

export default Tasks
