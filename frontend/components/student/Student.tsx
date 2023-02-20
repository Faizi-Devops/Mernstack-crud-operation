import Button from "../button/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import {  toast } from 'react-toastify';


type B = {
    name: string,
    class: string,
    batch: string,
    year: number,
    _id?:string
}

const Student = () => {
    const [data, setData] = useState<B[]>([]);
    const [naming,setNaming]=useState<string>("")
    const [classing,setClassing]=useState<string>("");
    const [batching,setBatching]=useState<string>("");
    const [yearing,setYearing]=useState<number>(0)



    useEffect(() => {
        getUsers()

    }, [])

    const alpha = (e:any)=>{
        setNaming(e.target.value)
        
    }
    const beta = (e:any)=>{
        setClassing(e.target.value);
        
    }
    const gema = (e:any) =>{
        setBatching(e.target.value)

    }
    const peta = (e:any)=>{
        setYearing(e.target.value)
    }






    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/users");
            setData(response.data);



        } catch (error) {
            console.log("Error getting data:", error);
        }
    };




    const onAddHandler = async() => {
        if(naming && classing && yearing && batching !==""){
            try {
                const newUser = {
                  name: naming,
                  class: classing,
                  batch: batching,
                  year:yearing
                };
                const response = await axios.post("http://localhost:4000/users", newUser);
                setData([...data,newUser])
                setNaming("")
                setClassing("")
                setYearing("")
                setBatching("")
                console.log("data created successfully:", response.data);
                toast('Data added succesfully 👍', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
              } catch (error) {
                console.log("Error creating user:", error);
                toast.error("Unfortunaley data has been not send!")
              }

        }
        else{
            toast.error("Please Fill all the Params")
        }
       

    }
    const onDeleteHandler = async(iding:string|undefined) =>{

        try {
            const response = await axios.delete(`http://localhost:4000/users/${iding}`);
            const deleted = data.filter((value,index)=>{
                if(iding !== value._id){
                    return value
                }
    
            })
            setData([...deleted])
            
        } catch (error) {
            
        }
       


    }
    const onEditHandler = () =>{

    }
    return (
        <div>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <div className="card" style={{ width: "24rem" }}>

                    <div className="card-body">
                        <h5 className="card-title text-center">Student Crud</h5>
                        <div className="mb-3 mt-3">
                            <input type="email" className="form-control" placeholder="Name" onChange={alpha}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="email" className="form-control" placeholder="Class" onChange={beta} />
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="email" className="form-control" placeholder="Batch" onChange={gema}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="email" className="form-control" placeholder="year" onChange={peta}/>
                        </div>
                        <div className="text-center">
                            <Button value="Add Student" color="btn btn-outline-success" clickHandler={onAddHandler} />

                        </div>
                        


                    </div>
                </div>


            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Batch</th>
                        <th scope="col">Year</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                {
                    data.map((value, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{value.name}</td>
                                    <td>{value.class}</td>
                                    <td>{value.batch}</td>
                                    <td>{value.year}</td>
                                    <td>
                                        <Button value="Delete" color="btn btn-outline-danger" clickHandler={()=>onDeleteHandler(value._id)}/>
                                    </td>
                                    <td>
                                        <Button value="Update" color="btn btn-outline-primary" clickHandler={onEditHandler}/>
                                    </td>
                                </tr>

                            </tbody>
                        )

                    })
                }


            </table>


        </div>
    )
}
export default Student;