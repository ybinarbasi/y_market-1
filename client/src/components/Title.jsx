import React from 'react';


const Title = (props) => {

  return (
    <div >
      <div className=' p-6 font-bold text-4xl'>
      {props.children}
      </div>
      
    </div>
  ) 
};

export default Title;
