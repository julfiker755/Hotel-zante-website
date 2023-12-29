import React from 'react';
import { categories } from './categoriesdata';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string'


const Categories = () => {
   const [params, setParams] = useSearchParams()
   const navigate = useNavigate()
   const handleClick = (label) => {
     let currentQuery = {}
     if (params) {
       currentQuery = qs.parse(params.toString())
     }
     const updatedQuery = { ...currentQuery, category: label }
 
     const url = qs.stringifyUrl({
       url: '/',
       query: updatedQuery,
     })
 
     navigate(url)
   }
   
  const parmsdata= params.get('category')
  


    return (
        <div className='flex items-center justify-between overflow-x-auto'>
           {categories.map((c,index)=>{
            const {label,icon:Icon}=c

            return (<div onClick={()=>handleClick(label)}  className={`flex 
            flex-col 
            items-center 
            justify-center 
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer ${parmsdata === label ? 'border-b-neutral-800 text-neutral-800' : ''}`} key={index}>
                <Icon size={26} />
               <div className='text-sm font-medium'> {label}</div>
                </div>)
           })}
        </div>
    );
};

export default Categories;