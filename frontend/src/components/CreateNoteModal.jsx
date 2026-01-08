import React from 'react'
import { Formik, Form, Field } from 'formik'

export default function CreateNoteModal({ isOpen, onClose, onSave, initialNote }) {
  if (!isOpen) return null

  const isEdit = !!initialNote
  const initialValues = initialNote ? { title: initialNote.title || '', description: initialNote.description || '' } : { title: '', description: '' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-96 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{isEdit ? 'Edit Note' : 'Create Note'}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <Formik 
          initialValues={initialValues} 
          enableReinitialize
          validateOnMount 
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await onSave(values)
              resetForm()
              onClose()
            } catch (err) { 
              console.error(err) 
            } finally { 
              setSubmitting(false) 
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="flex flex-col gap-3">
              <Field 
                name="title" 
                placeholder="Title" 
                className="border border-gray-200 px-3 py-2 rounded-lg" 
                autoFocus
              />
              <Field 
                as="textarea" 
                name="description" 
                placeholder="Description" 
                className="border border-gray-200 px-3 py-2 rounded-lg h-32 resize-none" 
              />
              <button 
                type="submit" 
                disabled={isSubmitting || !isValid} 
                className={`w-full py-2 rounded-lg font-medium ${isSubmitting || !isValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'text-gray-800'}`}
                style={{ backgroundColor: isSubmitting || !isValid ? undefined : '#CFE9A5' }}
              >
                {isEdit ? 'Update Note' : 'Save Note'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
