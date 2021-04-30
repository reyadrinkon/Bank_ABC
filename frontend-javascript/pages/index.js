import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to BANK_ABC
        </h1>

        <p className={styles.description}>
          A digital Bank working on Blockchain Technology
        </p>

        <div className={styles.grid}>
          <a href="http://localhost:3001/register" className={styles.card}>
            <h3>Create Account  &rarr;</h3>
            <p>To open a Bank account one need to have an valid NID card of Banglaedsh</p>
          </a>

          <a href="http://localhost:3001/deposit" className={styles.card}>
            <h3>Desposit in an account &rarr;</h3>
            <p>To deposit in an account you only have to know the NID number of that account holder</p>
          </a>

          <a
            href="http://localhost:3001/withdraw"
            className={styles.card}
          >
            <h3>Withdraw Money from account &rarr;</h3>
            <p>You have to provide Account holder NID and his password.</p>
          </a>
          <a
            href="http://localhost:3001/send"
            className={styles.card}
          >
            <h3>Send Money from one account to another &rarr;</h3>
            <p>You have to provide sender and reciever NID and sender's password.</p>
          </a>
         

        </div>
      </main>


    </div>
  )
}
