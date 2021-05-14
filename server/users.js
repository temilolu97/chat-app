const users = []

const addUser =({id,name,room})=>{
    name= name.trim().toLowerCase()
    room= room.trim().toLowerCase()

    const existingUser = users.find((user)=>user.room === room && user.name === name)

    if(existingUser){
        return( {
            error:'Username already taken'
        })
    }
    else{
        const user = {id,name,room}
        users.push(user)
        return user;
    }
}

const removeUser =(id)=>{
    const index = users.findIndex((user)=> user.id === id)

    if(index !== -1){
       return users.splice(index,1)[0] //splice returns another array of removed item so I have to specify that i need the first one
    }
}

const getUser =(id)=> {
    users.find(user=> user.id === id)
}

const getUsersInRoom = (room) =>{
    return users.filter((users)=>user.room === room)
}

module.exports ={ addUser, removeUser, getUser, getUsersInRoom}