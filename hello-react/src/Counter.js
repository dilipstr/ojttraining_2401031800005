import { useState } from 'react';
export default function Counter(){
    const [count,setCount] = useState(0)
    return(
        <>
         <h1 className='text-5xl'>{count}</h1>
        <button onClick={()=>{setCount(count+1)}} style={{padding:'10px'}}>+</button>  
        </>
    )
}