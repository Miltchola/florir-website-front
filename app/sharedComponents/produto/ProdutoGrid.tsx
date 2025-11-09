import { ProdutoCard } from './ProdutoCard';
import { Button } from '@/app/sharedComponents/ui/Button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionDivision } from '../ui/SectionDivision';
import { Line } from '../ui/Line';

interface Produto {
	_id: string;
	imagem: string;
	nome: string;
	descricao: string;
	preco: number;
	recomendado: boolean;
	disponiveis: number;
	tipo: string;
	buttonText: string;
	buttonLink?: (() => void);
	adminEdit?: boolean;
}

interface ProdutoGridProps {
	produtos: Produto[];
	quantidade?: number | null;
	mostrarBotaoVerTodos?: boolean;
	topMenu?: boolean;
	adminEdit?: boolean;
}

const categorias = [
	{ label: "Todos", value: "todos" },
	{ label: "Acessórios", value: "acessorios" },
	{ label: "Arranjos", value: "arranjos" },
	{ label: "Buquês", value: "buquês" },
	{ label: "Casamento", value: "casamento" },
	{ label: "Cúpulas", value: "cúpulas" },
	{ label: "Quadros", value: "quadros" },
	{ label: "Outros", value: "outros" },
];

export function ProdutoGrid({ produtos, quantidade = null, mostrarBotaoVerTodos = false, topMenu, adminEdit }: ProdutoGridProps) {
	const router = useRouter();
	const [editscreen, setEditScreen] = useState(false); // implementado em breve pra tela de edição
	const [categoria, setCategoria] = useState("todos");
	const [busca, setBusca] = useState("");

	// Filtragem por categoria e busca
	const produtosFiltrados = produtos.filter(p => {
		const categoriaMatch = categoria === "todos" || p.tipo.toLowerCase() === categoria;
		const buscaMatch = p.nome.toLowerCase().includes(busca.toLowerCase());
		return categoriaMatch && buscaMatch;
	});

	const produtosExibidos = quantidade == null ? produtosFiltrados : produtosFiltrados.slice(0, quantidade);

	return (
		<div className="flex flex-col items-center w-full">
			{topMenu && (
				<div className="w-full flex flex-col gap-4 mb-4">
					{/* Barra de filtros responsiva */}
					<div className="flex flex-col md:flex-row md:items-center gap-4 bg-[#DDB7AB] py-4 px-4">
						{/* Botões de filtro */}
						<div className="flex flex-wrap gap-2 justify-center md:justify-start">
							{categorias.map(cat => (
								<button
									key={cat.value}
									className={`px-6 py-2 rounded border font-serif text-base transition
									${categoria === cat.value
										? "bg-[#646862] text-white border-[#646862]"
										: "bg-transparent text-[#646862] border-[#646862]"
									}`}
									onClick={() => setCategoria(cat.value)}
								>
									{cat.label}
								</button>
							))}
						</div>
						{/* Barra de pesquisa */}
						<div className="flex-1 flex justify-center md:justify-end">
							<div className="relative w-full md:w-[350px]">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646862]">
									<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="7"/><line x1="13" y1="13" x2="17" y2="17"/></svg>
								</span>
								<input
									type="text"
									placeholder="Buscar Produtos..."
									value={busca}
									onChange={e => setBusca(e.target.value)}
									className="pl-10 pr-4 py-2 rounded border border-[#E6D7D0] bg-[#F5F5EF] text-[#646862] font-serif w-full focus:outline-none"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			<Line/>
            <div className="w-full flex flex-col sm:flex-row sm:justify-start px-4 sm:px-16 items-center sm:items-start gap-4 sm:gap-0">
				<SectionDivision text="Produtos" />
				{adminEdit && (
					<div className="w-full flex justify-center sm:justify-end">
						<Button
							text="Adicionar Produto"
							onClick={() => { alert('Função de adicionar produto') }}
						/>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12 w-full justify-items-center">
				{produtosExibidos.length === 0 ? (
					<div className="w-full flex justify-center items-center col-span-full">
						<h2 className="text-center  text-[#646862] font-serif py-18">
							Nenhum Produto encontrado
						</h2>
					</div>
				) : (produtosExibidos.map((p, idx) => (
					<motion.div
						key={p.nome + idx}
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
						viewport={{ once: true }}
					>
						<ProdutoCard
							_id={p._id}
							imagem={p.imagem}
							nome={p.nome}
							descricao={p.descricao}
							preco={p.preco}
							recomendado={p.recomendado}
							disponiveis={p.disponiveis}
							tipo={p.tipo}
							buttonText={p.buttonText}
							buttonLink={p.buttonLink}
							adminEdit={adminEdit}
						/>
					</motion.div>
				)))
				}
			</div>
			{mostrarBotaoVerTodos && quantidade != null && produtosFiltrados.length > quantidade && (
				<Button text="Ver Todos" onClick={() => router.push('/sectionPages/produtos')} />
			)}
		</div>
	);
}
