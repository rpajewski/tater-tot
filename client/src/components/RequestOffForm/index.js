import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_REQUEST_OFF } from '../../utils/mutations'
import { iDBPromise } from '../../utils/helpers'

import { UPDATE_REQUESTS } from '../../utils/actions'

const RequestOffForm = () => {
    const state = useSelector(state => state)
    const { employee } = state
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({ timeOff: '', reason: '', paidTimeOff: false })
    const [addRequestOff, {error}] = useMutation(ADD_REQUEST_OFF)

    const updateRequestOff = (request) => {
        dispatch({
            type: UPDATE_REQUESTS,
            requestOffs: request.addRequestOff
        })
        iDBPromise('requestOffs', 'put', request.addRequestOff)
    }

    const handleChange = event => {
        let { name, value } = event.target
        if (name === 'paidTimeOff') {
            if (value === 'true') {
                value = true
            }
            else {
                value = false
            }
        }

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        try {
            const { data } = await addRequestOff({
                variables: { ...formState }
            })
            updateRequestOff(data)
        }
        catch (err) {
            console.error(err)
        }
        window.location.assign(`/overview/${employee._id}`)
    }

    return (
            <div className="columns is-vcentered">
                <div className="box column is-10 is-offset-1">
                    <form id="form" onSubmit={handleFormSubmit}>
                        <div className="field">
                            <label className="label">Request Dates Off:</label>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="timeOff" name="timeOff" id="timeOff" placeholder="e.g May 4th - May 7th" value={formState.timeOff} onChange={handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                            </p>
                        </div>

                        <div className="field">
                            <label className="label">Reason For Wanting Off:</label>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="reason" name="reason" id="reason" placeholder="Reason for needing off..." value={formState.reason} onChange={handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-plane-departure"></i>
                                </span>
                            </p>
                        </div>

                        <div className="field">
                            <label className="label">Would you like to use vacation pay:</label>
                            <div className="control">
                                <label className="radio"><input type="radio" name="paidTimeOff" value={true} onChange={handleChange}></input>   Yes</label>
                                <label className="radio"><input type="radio" name="paidTimeOff" value={false} onChange={handleChange}></input>   No</label>
                            </div>
                        </div>

                        <div className="field">
                            <button className="button is-primary" type="submit">Submit</button>
                        </div>
                    </form>
                    {error && <div>Request Off Submission Failed</div>}
                </div>
            </div>
    )
}

export default RequestOffForm