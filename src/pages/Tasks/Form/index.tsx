import React, {useState, useEffect, ChangeEvent} from 'react'
import {Button, Form} from 'react-bootstrap'

import {useHistory, useParams} from 'react-router-dom'

import api from '../../../services/api'

import './index.css'

interface ITask {
  title: string;
  description: string;
}

const Tasks: React.FC = () => {

    const history = useHistory()
    const {id} = useParams()
    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    })

    useEffect(() => {
      if(id !== undefined){
        findTask(id)
      }
    }, [id])

    const updatedModel = (e: ChangeEvent<HTMLInputElement>) => {
          setModel({
              ...model,
              [e.target.name]: e.target.value
          })
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
         e.preventDefault()

         if(id !== undefined){
            const response = await api.put(`/tasks/${id}`, model)
         }else {
             const response = await api.post('/tasks', model)
         }
         back()
    }

    const findTask = async (id: string) => {
        const response = await api.get(`tasks/${id}`)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }

    const back = () => {
        history.goBack()
    }

    return (
        <div className="container mt-3">
           <div className="task-header">
                <h1>New Task</h1>
                <Button variant="dark" onClick={back} >Voltar</Button>
           </div>
           <div className="container">
           <Form  onSubmit={onSubmit}> 
             <Form.Group>
               <Form.Label>Titulo</Form.Label>
               <Form.Control type="text" name="title" 
               value={model.title}
               onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} /> 
             </Form.Group>
           
             <Form.Group>
               <Form.Label>Descrição</Form.Label>
               <Form.Control as="textarea" rows={3}  name="description" 
               value={model.description}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
               />
             </Form.Group>
    
             <Button variant="dark" type="submit">
               Submit
             </Button>
           </Form>
           </div>
        </div>
    )
}

export default Tasks
