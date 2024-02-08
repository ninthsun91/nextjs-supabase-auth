import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input className="border border-black" id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input className="border border-black" id="password" name="password" type="password" required />
      <button className="border border-black" formAction={login}>Log in</button>
      <button className="border border-black" formAction={signup}>Sign up</button>
    </form>
  );
}