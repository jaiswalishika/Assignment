import React, { useEffect, useState } from 'react'
import { IData } from '../models/IData'
import { DataService } from '../service/DataService'

//Data fetch--->possibility of delay
interface IState {
  loading: boolean,
  data: IData[],
  errorMsg: string
}


const Data: React.FC = () => {

  const [state, setState] = useState<IState>({
    loading: false,
    data: [] as IData[],
    errorMsg: ''
  })

  //network request
  useEffect(() =>{
     setState({...state , loading:true})
     
     DataService.getALLData()
     .then(res=> setState({
      ...state, loading:false, data:res.data 
     })
    ).catch(err => setState({
      ...state,
       loading:false,
       errorMsg:err.message
    })
  );
  //eslint-disable-next-line
  },[]);

  //destructure data from state
  const {loading , data, errorMsg} = state


  return (
    <div className='m-10 flex items-center justify-center'>
      <h1>Data from Api's</h1>
      {errorMsg && (<p>{errorMsg}</p>)}
      {loading && <h1>Loading...</h1>}
      <table>
        <thead className='border-yellow-900'>
          <tr className='p-5 gap-5'>
            <td>Id</td>
            <td>Title</td>
            <td>Body</td>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 && data.map(item =>(
              <tr key ={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Data