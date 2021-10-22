import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startRegister, stratLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        RFName: 'Jose',
        REmail: 'jose@gmail.com',
        RPassword1: '123456',
        RPassword2: '123456'
    })
    const { RFName, REmail, RPassword1, RPassword2 } = formRegisterValues

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        LEmail: 'samuel@gmail.com',
        LPassword: '123456'
    })
    const { LEmail, LPassword } = formLoginValues

    const handleLoginSubmit = ( e ) => {

        e.preventDefault();

        dispatch( stratLogin( LEmail, LPassword ) )

    };

    const handleRegisterSubmit = ( e ) => {

        e.preventDefault();

        if ( RPassword1 !== RPassword2 ) {

            Swal.fire( 'Error', 'Las contrasenas deben ser iguales', 'error' )

        }

        dispatch( startRegister( RFName, REmail, RPassword1 ) )

    };

    return (

        <div className='main-conatiner'>

            <div className='conatiner-forms'>

                <div className='login-conatiner'>

                    <form onSubmit={ handleLoginSubmit }>

                        <input
                            type='email'
                            name='LEmail'
                            placeholder='email@gmail.com'
                            value={ LEmail }
                            onChange={ handleLoginInputChange }
                        />
                        <input
                            type='password'
                            name='LPassword'
                            placeholder='********'
                            value={ LPassword }
                            onChange={ handleLoginInputChange }
                        />
                        <button 
                            type='submit'
                            className='btn blue-ghost'
                        >
                            Sing in
                        </button>

                    </form>

                </div>

                <div className='text-container2'>

                    <h1>Login</h1>
                    <h1>or</h1>
                    <h1>Register</h1>

                </div>

                <div className='register-container'>

                    <form onSubmit={ handleRegisterSubmit }>

                        <input
                            type='text'
                            name='RFName'
                            placeholder='Juan'
                            value={ RFName }
                            onChange={ handleRegisterInputChange }
                        />
                        <input
                            type='email'
                            name='REmail'
                            placeholder='email@gmail.com'
                            value={ REmail }
                            onChange={ handleRegisterInputChange }
                        />
                        <input
                            type='password'
                            name='RPassword1'
                            placeholder='*******'
                            value={ RPassword1 }
                            onChange={ handleRegisterInputChange }
                        />
                        <input
                            type='password'
                            name='RPasswor2'
                            placeholder='Rodriguez'
                            value={ RPassword2 }
                            onChange={ handleRegisterInputChange }
                        />
                        <button 
                            type='submit'
                            className='btn white-ghost'
                        >
                            Sign up
                        </button>

                    </form>

                </div>

            </div>

            <div className='text-container1'>

                <h1>Login</h1>
                <h1>or</h1>
                <h1>Register</h1>

            </div>

        </div>

    );

};

export default LoginScreen;
