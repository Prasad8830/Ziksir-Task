import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'

const initialValues = { username: '', password: '' }
const schema = Yup.object({ username: Yup.string().required('Required'), password: Yup.string().min(6, 'Too short').required('Required') })

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <Formik initialValues={initialValues} validationSchema={schema} validateOnMount onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await login(values.username, values.password)
            navigate('/')
          } catch (err) {
            setFieldError('username', err?.response?.data?.msg || 'Login failed')
          } finally { setSubmitting(false) }
        }}>
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-sm">Username</label>
                <Field name="username" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="username" /></div>
              </div>
              <div>
                <label className="text-sm">Password</label>
                <Field name="password" type="password" className="w-full border rounded px-3 py-2 mt-1" />
                <div className="text-xs text-red-600"><ErrorMessage name="password" /></div>
              </div>
              <button type="submit" disabled={isSubmitting || !isValid} className={`w-full py-2 rounded ${isSubmitting || !isValid ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-indigo-600 text-white'}`}>{isSubmitting ? 'Signing...' : 'Sign In'}</button>
            </Form>
          )}
        </Formik>
        <p className="text-sm mt-4">Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </div>
    </div>
  )
}
