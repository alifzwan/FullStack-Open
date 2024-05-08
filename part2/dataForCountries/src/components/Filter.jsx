import React from 'react'

const Filter = ({ value, onChange }) => {
    return (
        <div>
            <p>
                find countries
                <input type="text" value={value} onChange={onChange}/>
            </p>
        </div>
    )
}

export default Filter