import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './pages/Home/index'
import Tasks from './pages/Tasks/index'
import TaskForm from './pages/Tasks/Form/index'
import TaskDetail from './pages/Tasks/Detail/index'

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tarefas" exact component={Tasks} />
            <Route path="/tarefas_cadastro" exact component={TaskForm} />
            <Route path="/tarefas_cadastro/:id" exact component={TaskForm} />
            <Route path="/tarefas/:id" exact component={TaskDetail} />

        </Switch>
    )
}

export default Routes
