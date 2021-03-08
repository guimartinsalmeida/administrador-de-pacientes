import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form';
import Cita from './components/Cita';


function App() {


  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if (!citasIniciales) {
      citasIniciales = []
    }
  

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales)


  // Funcion que tome las citas actuales y agrega la nuvea
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  // Use effect se actualiza cuando el state esta listo y cuando hay cambios en el state
  //para decir al useEffect que se ejecute solo una vez le tienes que pasar unn array vacio []
  //tienes que pasar el let que definiste afuera de el useEffect para detro de el useEffect para que no te regresse un warning y el useEffect reconozca el let 
useEffect( () => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
if (citasIniciales) {
  localStorage.setItem('citas', JSON.stringify(citas))
} else {
  localStorage.setItem('citas', JSON.stringify([]))
}
}, [citas] )

  // funcion que elimina una cita por id
const eliminarCita = id => {
const nuevasCitas = citas.filter(cita => cita.id !== id)
guardarCitas(nuevasCitas)
}

//Mensaje condicional
const titulo = citas.length === 0 ? 'Ingrese una nueva cita' : 'Administra tus Citas'



//la aplicaaion tiene un concepto de 2 columnas divididas, por eso pongo en el app.js dos columnas con un row, en una pongo el formulario y en la otra lo que el formulario recibirá
  return (
<Fragment>
<h1>Adinistrador de pacientes</h1>
  <div>
    
    <div className='container'>
       <div className="row">
           <div className="one-half column">
             <Form
                crearCita={crearCita}
           /></div>
           <div className="one-half column">
            <h2>{titulo}</h2> 
           {citas.map(cita =>(
             <Cita
             key={cita.id}
             eliminarCita={eliminarCita}
             cita={cita}
             />
           ))}
           </div>
       </div>
    </div> 
    </div>
    </Fragment>
  );
}

export default App;
