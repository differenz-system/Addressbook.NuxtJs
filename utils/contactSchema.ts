import * as yup from 'yup'

export const contactSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, 'Mobile must contain only numbers')
    .min(10, 'Mobile must be at least 10 digits')
    .required('Mobile is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
})
