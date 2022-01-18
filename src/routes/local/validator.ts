import yup from 'yup'
import moment from 'moment'

export const registerValidator = yup.object().shape({
  email: yup.string().required().email().trim(),
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  birthDate: yup
    .string()
    .required()
    .transform(str => moment(str, 'YYYY-MM-DD')),
  password: yup.string().required().trim(),
})
