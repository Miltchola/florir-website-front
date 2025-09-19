import { Question } from './Question';
import { Button } from '@/app/sharedComponents/ui/Button';
import { useState } from 'react';

interface Pergunta {
	pergunta: string;
	resposta: string;
}

interface QuestionHandlerProps {
	perguntas: Pergunta[];
	quantidade?: number | null;
	mostrarBotaoVerTodas?: boolean;
}

export function QuestionHandler({ perguntas, quantidade = null, mostrarBotaoVerTodas = false }: QuestionHandlerProps) {
	const [mostrarTodas, setMostrarTodas] = useState(false);
	const perguntasExibidas = mostrarTodas || quantidade == null ? perguntas : perguntas.slice(0, quantidade);

	return (
		<div className="flex flex-col items-center w-full my-8">
            <h3 className="text-font-primary font-light text-4xl mb-1 tracking-normal">DÚVIDAS FREQUENTES</h3>
			{perguntasExibidas.map((q, idx) => (
				<Question
					key={q.pergunta + idx}
					pergunta={q.pergunta}
					resposta={q.resposta}
					delay={idx * 0.2}
				/>
			))}
			{mostrarBotaoVerTodas && !mostrarTodas && quantidade != null && perguntas.length > quantidade && (
				<Button text="Ver Todas" onClick={() => setMostrarTodas(true)} />
			)}
		</div>
	);
}
