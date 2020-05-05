import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";
import TopBar from '../../components/TopBar';

function RoomRedirect(props) {
  
  const [roomCode, setRoomCode] = useState('');
  // const [validRoomCode, setValidRoomCode] = useState(true);
  // const [nullRoomCode, setNullRoomCode] = useState(false);
  const { roomState: { loggedIn }, roomState, setRoomState } = useContext(RoomContext);
  // const roomCodeRef = useRef();
  const participantHandleRef = useRef();

  // const invalidRoomCode = <p className="text-danger">That room is not currently in use.</p>
  // const emptyRoomCode = <p className="text-danger">Please enter a room code.</p>

  useEffect(() => {
    // console.log('The room code is ' + roomCode);
    // const previousInfo = JSON.parse(localStorage.getItem('roomState'));
    setRoomCode(props.match.params.roomCode);
    // if (previousInfo) welcomeBackPrompt(previousInfo);
  }, []);

  function handleInput(e) {
    switch (e.target.id) {
      case 'roomCode':
        // setRoomCode(e.target.value.slice(0, 4));
        break;
      default:
        break;
    }
  }

  const joinRoomByCode = async (e) => {
    e.preventDefault();
    // setValidRoomCode(true);
    // setNullRoomCode(false);
    try {
      // if (!roomCode) {
      //   setNullRoomCode(true);
      //   throw new Error('You Must Enter a Room Code');
      // }
      const newRoom = await API.getRoomByCode(roomCode);
      if (!newRoom.data[0]) {
        // setValidRoomCode(false);
        throw new Error('Room Does Not Exisit');
      }

      localStorage.setItem('roomState', JSON.stringify({
        roomID: roomCode,
        participant: participantHandleRef.current.value
      }));

      setRoomState({ ...roomState, participant: participantHandleRef.current.value ,roomData: newRoom.data[0] })

      props.history.push('../userroom')
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <div>
      <TopBar noTitle />
      <Container>
        <Row>
          <Col>
            <h3>Response.io!</h3>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <form className='mt-3'>
              <div className="form-group">
                <p>You are joining room number <strong>{roomCode}</strong>!</p>
                <p>Please enter a display name:</p>
                  <input
                    onChange={handleInput}
                    ref={participantHandleRef}
                    type="text"
                    className="form-control mt-2"
                    id="participantHandle"
                    aria-describedby="User Handle"
                    placeholder="User Handle" />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  onClick={joinRoomByCode}
                  type="submit"
                  className="btn btn-warning btn-sm"
                >Join Room</button>
                {/* <Link to={loggedIn ? '/rooms' : '/login'}>
                  <button
                    className="btn btn-outline-primary btn-sm login-link ml-2">
                    Open New Room
                  </button>
                </Link> */}
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )

};

export default RoomRedirect;
