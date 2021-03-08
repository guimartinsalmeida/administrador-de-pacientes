import React, {Fragment, useState} from 'react';
import shortid from 'shortid'

const Form = ({crearCita}) => {

    // Crear el state de citas
  // Es un objeto para poder agregar todos los campos de el formulario
  const [cita, actualizarCita] = useState({
        mascota:'',
        proprietario:'',
        fecha:'',
        hora:'',
        sintomas:''

})


// voy a crear otro state para hacer la validacion en el formulario
//es un bollean porque cuando el usuario inicia la aplicacion no hay errores 

const [error, actualizarError] = useState(false)

// funcion que se ejecuta cada que el usuario eribe en un input
//el evento es en realidad la funcion que hace el onClick, el evento de el click, y le passo el evento para ver donde estoy escribiendo
//uso la funcion actualizarCita porque ella es la que guarda las informaciones en el state 
//why the guy used array destructiring, going from the idea that i think e.target its a method and you call what you want to acces as name
const actualizarState = e => {
    actualizarCita({
        ...cita,
        [e.target.name]: e.target.value
    })
}

//extraer los valores
const {mascota, proprietario, fecha, hora, sintomas} = cita

//Cuando el usuario presiona agregar cita
// si lo dejo com un parentesis y no pongo el e.preventDefault se lo pasara como get en la url, todos los datos
const submitCita = e => {
    e.preventDefault();


    //Validar
    //el trim lo que hace es que si el usuario agrega un espaci en blanco lo eliminara
    //siempre en una validacion tienes que poner un return para que no se suiga ejecutando el codigo
    if(mascota.trim() === '' || 
            proprietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === '' ){
                //en caso de que falle la validacion el error de el state que cree pasa a ser true
                actualizarError(true)

        return
    }


    //Eliminar el mensaje previo 
    //si hay un error passa la funcion actualizarError a true, pero si ek erroe no existe se lo passa a false otra vez
    actualizarError(false)

    //Asignar un id
        //el shortid asinga un id al cita id
    cita.id = shortid()

    //Crear la lista
    crearCita(cita)


    // Reiniciar el form
    //con ka funcoin actualizarCita reinicio el state pasandole el objeto con los datos vacio 
    //Se reinicia porque puse los values en cada input, y como tengo asignada las variables que hice el destructiring en la linea 35, react al detectar que es una string vacia, recarga esta parte de el componente
    actualizarCita({
        mascota:'',
        proprietario:'',
        fecha:'',
        hora:'',
        sintomas:''

    })


}




    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className='alerta-error'>Todos los campos son obligatorios</p> :null}

            <form
            onSubmit={submitCita}
            
            >
                <label>Nombre Mascota</label>
                <input
                type='text'
                name= 'mascota'
                className='u-full-width'
                placeholder='Nombre Mascota'
                onChange={actualizarState}
                value={mascota}
                />
            
            <label>Nombre del Dueño</label>
                <input
                type='text'
                name= 'proprietario'
                className='u-full-width'
                placeholder='Nombre del Dueño'
                onChange={actualizarState}
                value={proprietario}
                />
                <label>fecha</label>
                <input
                type='date'
                name= 'fecha'
                className='u-full-width'
                onChange={actualizarState}
                value={fecha}
                />
                <label>hora</label>
                <input
                type='time'
                name= 'hora'
                className='u-full-width'
                onChange={actualizarState}
                value={hora}
                />
                <label>Sintomas</label>
                <textarea
                type='text'
                name= 'sintomas'
                className='u-full-width'
                placeholder='Sintomas'
                onChange={actualizarState}
                value={sintomas}
                />

                <button
                type="submit"
                className='u-full-width button-primary'
                >
                    Agregar cita
                </button>
                </form>
        </Fragment>
        );
}
 
export default Form;