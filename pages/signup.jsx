import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Signup() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = async ({ name, email, phone }) => {
      const { data, error } = await axios.post('api/signup', {
         name,
         phone,
         email,
      });
      console.log(data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <label htmlFor='name'>
            {' '}
            Name:
            <input id='name' type='name' {...register('name', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
         </label>
         <br />
         <br />
         <label htmlFor='phone'>
            Phone:
            <input id='phone' type='tel' {...register('phone', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
         </label>
         <br />
         <br />
         <label htmlFor='email'>
            {' '}
            Email:
            <input id='email' type='email' {...register('email', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
         </label>
         <br />
         <br />
         <input type='submit' />
      </form>
   );
}
