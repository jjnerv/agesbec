import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from "./schemas/login.schema";
import { useLoginSubmit } from "./hooks/useLoginSubmit";
import styles from './login.module.scss'

function Login() {
  const { onSubmit, onInvalid } = useLoginSubmit();
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <img
          src="/logo-light.png"
          alt="Logo AGESBEC"
          className={styles.logo}
        />

        <h1>Bem-vindo</h1>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
          <div className={styles.field}>
            <label htmlFor="email">
              E-mail
            </label>

            <input
            id="email"
              type="email"
              {...register("email")}
              placeholder="usuario@empresa.com.br"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">
              Senha
            </label>

            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}

export default Login;