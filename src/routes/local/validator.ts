import yup from 'yup'
import moment from 'moment'

export const registerValidator = yup.object().shape({
  email: yup.string().required().email().trim(),
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  birthDate: yup
    .string()
    .required()
    .transform(str => {
      console.log(str)

      const res = moment(str).format('YYYY-MM-DD')
      console.log(res)
      return res
    }),
  password: yup.string().required().trim(),
})

export const verifyQueryParam = yup.object().shape({
  token: yup.string().required(),
  exp: yup
    .number()
    .integer()
    .required()
    .test(num => num! < Date.now()),
})
