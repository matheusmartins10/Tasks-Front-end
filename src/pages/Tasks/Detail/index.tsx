import React, {useState, useEffect} from 'react'

import {useHistory, useParams} from 'react-router-dom'


import {Button, Card, Badge} from 'react-bootstrap'

import api from '../../../services/api'

interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    const history = useHistory()
    const {id} = useParams()

    const [task, setTask] = useState<ITask>()

    useEffect(()=> {
      findTask()
    }, [id])

    const back = () => {
        history.goBack()
    }

    const findTask = async () => {
        const response = await api.get<ITask>(`/tasks/${id}`)
        setTask(response.data)
    }

    return (
        <div className="container mt-3">
        <div className="task-header">
             <h1>Task Detail</h1>
             <Button variant="dark" onClick={back} >Voltar</Button>
        </div>
            <Card>
                 <Card.Body>
                   <Card.Title>{ task?.title}</Card.Title>
                   <Card.Text>
                     {task?.description}
                     <br/>
                     <Badge variant={task?.finished ? "success" : "warning"}>
                            {task?.finished ? "FINALIZADO" : "PENDENTE"}
                     </Badge>
                   </Card.Text>
             </Card.Body>
           </Card>
        </div>
    )
}

export default Detail
