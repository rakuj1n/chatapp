import styled from 'styled-components'
import LogOut from './LogOut'
import ChatInput from './ChatInput'
import Message from './Message'

export default function ChatContainer({ currentChat }) {

    const handleSendMsg = async (msg) => {
        console.log('hi')
    }

    return (
        <Container>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} alt='avatar' />
                    </div>
                    <div className='username'>
                        <h3>{currentChat?.username}</h3>
                    </div>
                </div>
                <LogOut />
            </div>
            <Message />
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
    )
}

const Container = styled.div`
    padding-top: 1rem;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
`