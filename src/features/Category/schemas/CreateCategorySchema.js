import * as yup from 'yup'

const schema = yup.object().shape({
    title:yup.string().required("The Title is Required").max(50)
}) 

export default schema