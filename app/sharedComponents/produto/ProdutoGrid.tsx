import { ProdutoCard } from './ProdutoCard';
import { Button } from '@/app/sharedComponents/ui/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Produto {
	imagem: string;
	nome: string;
	descricao: string;
	preco: string;
	recomendado: boolean;
	tipo: string;
	buttonText: string;
	buttonLink?: (() => void);
}

interface ProdutoGridProps {
	produtos: Produto[];
	quantidade?: number | null;
	mostrarBotaoVerTodos?: boolean;
}

export function ProdutoGrid({ produtos, quantidade = null, mostrarBotaoVerTodos = false }: ProdutoGridProps) {
	const [mostrarTodos, setMostrarTodos] = useState(false);
	const produtosExibidos = mostrarTodos || quantidade == null ? produtos : produtos.slice(0, quantidade);

	return (
		<div className="flex flex-col items-center w-full my-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12 w-full justify-items-center">
				{produtosExibidos.map((p, idx) => (
					<motion.div
						key={p.nome + idx}
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
						viewport={{ once: true }}
					>
						<ProdutoCard
							imagem={p.imagem}
							nome={p.nome}
							descricao={p.descricao}
							preco={p.preco}
							recomendado={p.recomendado}
							tipo={p.tipo}
							buttonText={p.buttonText}
							buttonLink={p.buttonLink}
						/>
					</motion.div>
				))}
			</div>
			{mostrarBotaoVerTodos && !mostrarTodos && quantidade != null && produtos.length > quantidade && (
				<Button text="Ver Todos" onClick={() => setMostrarTodos(true)} />
			)}
		</div>
	);
}
