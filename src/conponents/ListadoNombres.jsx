import React, { useState } from 'react';
import uniqid from 'uniqid';

const ListadoNombres = () => {

    const [nombre, setNombre] = useState("");
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEditando, setIdEditando] = useState('');
    const [error,setError] = useState(null);

    const addNombre = () => {
        if (nombre.trim() === '') {
            setError("Ingrese un nombre");
            return;
        }
        const nuevoNombre = {
            id: uniqid(),
            nombre
        }
        setListaNombres([...listaNombres, nuevoNombre]);
        setNombre('');
        setError(null);


    }
    const deleteNombre = (id) => {
        const nuevoArray = listaNombres.filter(item => item.id !== id);
        setListaNombres(nuevoArray);
    }
    const editarNombre = () => {
        const nuevoArray = listaNombres.map(item => item.id === idEditando ? { id:idEditando, nombre } : item)
        console.log(nuevoArray,idEditando,nombre);
        setListaNombres(nuevoArray);
        setModoEdicion(false)
    }
    const editar = (item) => {
        if (nombre.trim() === '') {
            setError("Ingrese un nombre");
            return;
        }
        setModoEdicion(true);
        setNombre(item.nombre);
        setIdEditando(item.id);
        setError(null);
    }
    const submit=(e)=>{
        e.preventDefault();
        if(modoEdicion){
            editarNombre();
        }else{
            addNombre();
        }
    }

    return (
        <React.Fragment>

            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listaNombres.map(item =>
                                <li className="list-group-item" key={item.id}>
                                    {item.nombre}
                                    <button
                                        className="btn btn-success float-end"
                                        onClick={() => editar(item)}
                                    >
                                        editar
                                        </button>

                                    <button
                                        className="btn btn-danger float-end"
                                        onClick={() => deleteNombre(item.id)}
                                    >
                                        borrar
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form
                        className="form-group d-grid gap-1"
                        onSubmit={submit}
                    >
                        <input className="form-control" type="text" placeholder="Introduce el nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input className="form-control btn btn-info btn-block" type="submit" value={modoEdicion ? "Editar nombre" : "Registrar nombre"} />
                    </form>
                        {
                            error!=null?(
                                <div className="alert alert-danger my-1">   
                                    {error}
                                </div>
                            ): (
                                <div></div>
                            )

                        }
                </div>

            </div>
        </React.Fragment>
    )
}

export default ListadoNombres
