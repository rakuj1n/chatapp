import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Contacts from '../Components/Contacts'
import {allUsersRoute} from '../utilities/APIRoutes'
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'

export default function Chat() {

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
        const fetchUsers = async () => {
            console.log("2nd")
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    console.log("1st 1st")
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
                <ChatContainer currentChat={currentChat} />
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