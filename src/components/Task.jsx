import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const Task = (props) => {
    const { name, description, priority, complete, id, onDelete, onComplete } = props

    const handleDelete = () => {
        onDelete(id) //Au click sur le bouton Supprimer, on emet l'event onDelete en fournissant l'index de la task
    }

    const handleComplete = () => {
        onComplete(id) //Au click sur le bouton Terminer, on emet l'event onComplete en fournissant l'index de la task
    }

    return (
        <Card className='mb-3'>
            <Card.Header className={(priority === 'urgent') ? 'bg-danger' : (priority === 'normal') ? 'bg-primary' : 'bg-secondary'}>{name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {description}
                </Card.Text>
                <div className='d-flex justify-content-end'>
                <Button style={{ marginRight : "1rem"}} variant="success" disabled={complete}  onClick={handleComplete}>Terminer</Button>
                <Button variant="danger" onClick={handleDelete}>Supprimer</Button>

                </div>
            </Card.Body>
        </Card>
    )
}

export default Task