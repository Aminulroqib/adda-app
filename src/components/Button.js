import React from 'react';

const Button = ({onClick = null, children = null }) => (
    <button onClick={onClick} className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 justify-center">{children}</button>
);

export default Button;