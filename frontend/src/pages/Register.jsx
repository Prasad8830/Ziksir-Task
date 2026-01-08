import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { register as registerUser } from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'

const initialValues = { name: '', username: '', email: '', password: '', confirm: '' }
const schema = Yup.object({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
  confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default function Register() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <Formik initialValues={initialValues} validationSchema={schema} validateOnMount onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await registerUser(values.name, values.username, values.email, values.password)
            navigate('/')
          } catch (err) {
            setFieldError('email', err?.response?.data?.msg || 'Registration failed')
          } finally { setSubmitting(false) }
        }}>
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-sm">Name</label>
                <Field name="name" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="name" /></div>
              </div>
              <div>
                <label className="text-sm">Username</label>
                <Field name="username" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="username" /></div>
              </div>
              <div>
                <label className="text-sm">Email</label>
                <Field name="email" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="email" /></div>
              </div>
              <div>
                <label className="text-sm">Password</label>
                <Field name="password" type="password" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="password" /></div>
              </div>
              <div>
                <label className="text-sm">Confirm</label>
                <Field name="confirm" type="password" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="confirm" /></div>
              </div>
              <button type="submit" disabled={isSubmitting || !isValid} className={`w-full py-2 rounded ${isSubmitting || !isValid ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-indigo-600 text-white'}`}>{isSubmitting ? 'Creating...' : 'Create Account'}</button>
            </Form>
          )}
        </Formik>
        <p className="text-sm mt-4">Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  )
}
