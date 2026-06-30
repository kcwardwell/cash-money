import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { error } from 'console'


const minLengthErrorMessage = 'Password must be at least 8 characters long'
const maxLengthErrorMessage = 'Password must be no more than 20 characters long'
const uppercaseErrorMessage = 'Password must contain at least one uppercase letter'
const lowercaseErrorMessage = 'Password must contain at least one lowercase letter'
const numberErrorMessage = 'Password must contain at least one number'
const specialCharacterErrorMessage = 'Password must contain at least one special character'

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

const SignUpSchema = z.object({
  email: z.email(),
  password: passwordSchema,
})

export const Route = createFileRoute('/auth/signup')({
  component: SignUp

})


function SignUp() {
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      console.log(values)
    },
    validators: {
      onSubmit: SignUpSchema,
      onBlur: SignUpSchema
    }
  })
  return (
    <>
      <form className='flex flex-col items-start justify-center'
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      >
        <Field name='email'>
          {(field) => {
            const { errors, isTouched } = field.state.meta
            return(
              <div>
                <label>Email</label>
                <input 
                  value={field.state.value}
                  onBlur={() => field.handleBlur()}
                  placeholder='Enter your email'
                />
                {errors.length> 0 && isTouched && <span>{errors[0]?.message}</span>}
              </div>
            )
          }}
        </Field>

        <Field name='password'>
          {(field) => {
            const { errors , isTouched} = field.state.meta
            return (
              <div>
                <label>Password</label>
                <input
                  value={field.state.value}
                  onBlur={() => field.handleBlur()}
                  placeholder='enter your password'
                />
                {errors.length > 0 && isTouched && <span>{errors[0]?.message}</span>}
              </div>
            )
          }}
        </Field>
        <div className='fles items-center justify-center'>
          <button className='border border-2 border-blue-500' type='submit'>Create Account</button>
          <button className='border border-2 border-gray-500'  type='reset'>Cancel</button>
        </div>

      </form>
    </>
  )
}

