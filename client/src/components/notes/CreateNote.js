import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date} = note;
                const newNote = {
                    title, content, date
                }

                await axios.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                })
                
                return history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="createsection">
            
            <form onSubmit={createNote} autoComplete="off">
                <div className="titlecreate">
                    <label htmlFor="title">Title</label>
                    <input type="text" className='createblock' value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>

                <div className="content">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" className='contentblock' value={note.content} id="content"
                    name="content" required rows="10" onChange={onChangeInput} />
                </div>
                
                <div className="date">
                <label htmlFor="date">Date: {note.date} </label>
                    <input type="date" id="date"
                    className='date block'
                    name="date" onChange={onChangeInput} />
                </div>
                
                <div className='bsave'>
                <button className="saveit" type="submit">Save</button>
                </div>
               
            </form>
        </div>
    )
}