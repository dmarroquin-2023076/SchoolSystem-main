//Gestionar lógica de autenticación
import User from '../users/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

//Registrar
export const register = async(req, res)=>{
    try{    
    
        let data = req.body
    
        let user = new User(data)
    
        user.password = await encrypt(user.password)
        
        user.role = 'STUDENT_ROLE'

        await user.save()
        
        return res.send(
            {
                message: `Registered successfully, can be login with username: ${user.username}`
            }
        )
    
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with user registration',
                 err
                }
            )
    }
}

//Loggearse
export const login = async(req, res)=>{
    try{
       
        let { userLoggin, password } = req.body
       
        let user = await User.findOne(
            {
                $or: [ 
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) 
        
        if(user && await checkPassword(user.password, password)){
          
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role,
                keepper: user.course
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send(
            {
                message: 'Invalid credentials'
            }
        )

    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with login function',
                 err
                }
            )
    }
}