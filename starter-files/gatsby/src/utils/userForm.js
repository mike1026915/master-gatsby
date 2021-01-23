import { useState } from 'react';

export default function useForm(defaults) {
    const [values, setValues] = useState(defaults);

    function updateValues(e) {
        let value = e.target.value;
        console.log(e)

        if (e.target.type === 'number') {
            value = parseInt(value, 10);
        }

        setValues({
            ...values,
            [e.target.name]: value,
        })
    }

    return { values, updateValues }
}