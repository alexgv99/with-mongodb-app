import Head from 'next/head';
import { getCollection } from '../util/mongodb';

import styles from '../styles/pages.module.scss';
import { useState } from 'react';

export default function Home({ assuntos }) {
	const [adding, setAdding] = useState(false);
	return (
		<div className={styles.page}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.header}>
				<h2>Cadastro de assuntos</h2>
				<div className={styles.toolbar}>
					<button type="button" className={styles.btnLink} onClick={() => setAdding(true)} disabled={adding}>
						novo assunto
					</button>
				</div>
			</div>

			<div className={styles.container}>
				<main className={styles.main}>
					<h1 className={styles.title}>Assuntos</h1>

					{adding && (
						<div className={styles.card}>
							<h3>Documentation &rarr;</h3>
							<p>Find in-depth information about Next.js features and API.</p>
						</div>
					)}

					<div className={styles.grid}>
						{(assuntos || []).map((assunto) => (
							<div key={assunto._id} className={styles.card}>
								<h3>{assunto.title}</h3>
								<p>{assunto.description}</p>
							</div>
						))}
					</div>
				</main>

				<footer className={styles.footer}>
					<p>
						Testes com <img src="/Nextjs-icon.png" alt="Next.js logo" className={styles.logo} /> e
						<img src="/mongodb-atlas.png" alt="MongoDB Atlas logo" className={styles.logo} />
					</p>
				</footer>
			</div>
		</div>
	);
}
export async function getServerSideProps(context) {
	const collection = await getCollection('assuntos');
	const data = await collection.find({});
	const assuntos = await data.toArray();
	console.log('assuntos', assuntos);
	return {
		props: { assuntos: JSON.parse(JSON.stringify(assuntos)) },
	};
}
