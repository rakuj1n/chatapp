import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Contacts from '../Components/Contacts'
import {allUsersRoute,host} from '../utilities/APIRoutes'
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'
import { io } from 'socket.io-client'

export default function Chat() {

    const socket = useRef()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const navigate = useNavigate()
    const [currentChat,setCurrentChat] = useState(undefined)
    const [status,setStatus] = useState('idle')

    useEffect(() => {
        setStatus('loading')
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login')
           } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
            setStatus('success')
           }
    },[])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit("add-user",currentUser._id)
        }
    },[currentUser])

    useEffect(() => {
        const fetchUsers = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                    setContacts(data.data)
                } else {
                    navigate('/setAvatar')
                }
            }
        }
        fetchUsers()
    },[currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <Container>
            <div className='container'>
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {status === "success" && currentChat === undefined ?
                <Welcome currentUser={currentUser} /> :
                <ChatContainer socket={socket} currentChat={currentChat} currentUser={currentUser} />
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:1rem;
    background-color:#131324;
    .container {
        height:85vh;
        width:85vw;
        background-color:#00000076;
        display: grid;
        grid-template-columns:25% 75%;
        @media screen and (min-width:720px) and (max-width:1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`