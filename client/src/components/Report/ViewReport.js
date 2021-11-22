import React from 'react'
import { Button } from 'react-bootstrap'



export default function ViewReport() {
    return (
        <div className="ViewReport">
            <h2>View report</h2>
            <Button variant="secondary" size="lg" className="mb-3" onClick={event => window.location.href = '/searchbydate'} >search by date</Button>
            
        </div>
    )
}