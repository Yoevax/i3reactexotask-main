import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Task from "../components/Task"
import { useForm } from "react-hook-form"
//import { Form } from 'react-bootstrap'

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Faire la vaisselle", description: "Aude t'abuse ça traine depuis 3 jours là ", priority: "urgent", complete: false },
        { id: 2, name: "Faire les courses", description: "Fajitas party (+ apéro (bcp) ) avec les collègues", priority: "normal", complete: true },
    ])

    const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onBlur' })

    //Boolean pour relier au switch pour les filtres
    const [currents, setCurrents] = useState(false)
    const [urgents, setUrgents] = useState(false)
    const [completes, setCompletes] = useState(false)

    const addTask = (data) => {
        //tasks.map(t => t.id) -> Renvoie un tableau avec juste les id
        //Math.max(tasks.map(t => t.id)) -> Renvoie l'id max présent dans le tableau d'ids
        let newId = Math.max(...tasks.map(t => t.id)) + 1 //Plus qu'à faire +1 dessus
        data.id = newId
        console.log(data);
        setTasks(previous => [...previous, { ...data, complete: false }])
        //Remet le formulaire à 0 après ajout (vu que sur la même page)
        reset();
    }

    const deleteTask = (id) => {
        //On utilise la méthode filter pour filtrer le tablau dans celle que l'on veut supprimer
        //On remplace l'ancien tableau par le nouveau table mais filtré
        setTasks(previous => [...previous.filter((t) => t.id !== id)])
    }

    const completeTask = (id) => {
        //On modifie le tableau pour qu'il soit égal au même, mais avec l'élément dont on a reçu l'index qui a son complete passé à true
        setTasks(previous => [...previous.map((t) => {
            //Si les indices correspondent, on passe complete de l'élément en cours à true
            if (t.id === id) {
                t.complete = true;
            }
            //On renvoie t dans tous les cas modifié ou non
            return t
        }
        )])
    }

    return (
        <div className="d-flex justify-content-between" style={{ width: "70vw", margin: "auto" }}>
            <div style={{ width: "45%" }}>
                <h2>Ajouter une nouvelle tâche</h2>
                <Form onSubmit={handleSubmit(addTask)}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" aria-describedby="nameError" {...register("name", { required: true })} />
                        {(errors.name?.type === "required") && <Form.Text className="text-danger" id="nameError" >
                            Veuillez entrer un nom
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" {...register("description")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priorite">
                        <Form.Label>Priorité</Form.Label>
                        <Form.Select aria-describedby="priorityError" {...register("priority", { required: true })}>
                            <option value=''>Choisir priorité</option>
                            <option value="urgent">Urgent</option>
                            <option value="normal">Normal</option>
                            <option value="bas">Bas</option>
                        </Form.Select>
                        {(errors.priority?.type === "required") && <Form.Text className="text-danger" id="priorityError" >
                            Veuillez selectionner une priorité
                        </Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit">Ajouter la tâche</Button>
                </Form>
            </div>
            <div style={{ width: "45%" }}>


                <h2>Listes des tâches</h2>
                <div className="d-flex align-items-center justify-content-between">
                    <h3>Filtres</h3>
                    <Form.Check
                        type="switch"
                        id="currents"
                        label="En cours"
                        onChange={e => setCurrents(e.target.checked)}
                    />
                    <Form.Check
                        type="switch"
                        id="urgents"
                        label="Urgentes"
                        onChange={e => setUrgents(e.target.checked)}

                    />
                    <Form.Check
                        type="switch"
                        id="completes"
                        label="Terminées"
                        onChange={e => setCompletes(e.target.checked)}

                    />
                </div>
                {tasks
                    .filter(t => {
                        //Si le switch en cours est vrai, on ne prend que les tasks pas complete
                        if (currents) return t.complete === false
                        //Si le switch est faux, on prend toutes les tasks
                        else return true
                    })
                    .filter(
                        t => {
                            //Si le switch urgent est vrai, on ne prend que les tasks urgentes
                            if (urgents) return t.priority === "urgent"
                            //Si le switch est faux, on prend toutes les tasks
                            else return true
                        }
                    )
                    .filter(
                        t => {
                            //Si le switch terminées est vrai, on ne prend que les tasks completes
                            if (completes) return t.complete === true
                            //Si le switch est faux, on prend toutes les tasks
                            else return true
                        }
                    )
                    .map((t) => <Task key={t.id} id={t.id} name={t.name} description={t.description} priority={t.priority} complete={t.complete} onDelete={deleteTask} onComplete={completeTask} />)}


            </div>
        </div>

    )


}

export default ToDoList