import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
export default function Login() {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = async ({ phone, email }) => {
      const { data, error } = await axios.post('api/authentication', {
         phone,
         email,
      });
      console.log(data);
      data.status == 'ok' && router.push('/dashboard');
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <label htmlFor='phone'>
            Phone:
            <input id='phone' type='tel' {...register('phone', { required: true })} />
         </label>
         <br />
         <br />
         <label htmlFor='email'>
            {' '}
            Email:
            <input id='email' type='email' {...register('email', { required: true })} />
         </label>
         <br />
         <br />
         <input type='submit' />
      </form>
   );
}
