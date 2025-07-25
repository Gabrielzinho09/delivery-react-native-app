import React, { useEffect, useState ,useContext} from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/Auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';
import { UpdateNotificationTokenUserUseCase } from '../../../Domain/useCases/user/UpdateNotificationTokenUser';



// captura de valores

const HomeViewModel = () => {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: ''    
    });
    
//const { user, getUserSession } = useUserLocal();
const {user, saveUserSession }= useContext(UserContext);
console.log('USER SESSION' + JSON.stringify(user))
    
    const onChange=(property: string,value: any)=>{
        setValues({
            ...values,[property]: value
        });
    }
    const login = async()=>{
        if(isValidForm()){
            const response = await LoginAuthUseCase(values.email,values.password);
            console.log('RESPONSE: ' + JSON.stringify(response));
            if(!response.success){
                setErrorMessage(response.message)
            }else{
                saveUserSession(response.data);
            }
        }

    }
    const updateNotificationToken = async (id: string , token: string) => {
        const result = await UpdateNotificationTokenUserUseCase(id, token);
    }

    const isValidForm = (): boolean =>{
        if(values.email === ''){
            setErrorMessage('Ingresa el correo electronico');
            return false;
        }
        if(values.password === ''){
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
        return true;
    }
    return {
        ...values,
        user,
        onChange,
        login,
        ErrorMessage,
        updateNotificationToken
        
    }
}
export default HomeViewModel
