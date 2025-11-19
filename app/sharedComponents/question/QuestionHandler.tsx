import { Question } from './Question';
import { Button } from '@/app/sharedComponents/ui/Button';
import { useState } from 'react';
import { SectionDivision } from '../ui/SectionDivision';
import { PerguntaModalEdit } from '@/app/adminPage/perguntas/components/PerguntaModalEdit';

interface Pergunta {
    _id: string;
    pergunta: string;
    resposta: string;
	adminEdit?: boolean;
}

interface QuestionHandlerProps {
    perguntas: Pergunta[];
    quantidade?: number | null;
    mostrarBotaoVerTodas?: boolean;
    adminEdit?: boolean;
}

export function QuestionHandler({ perguntas, quantidade = null, mostrarBotaoVerTodas = false, adminEdit = false }: QuestionHandlerProps) {
    const [mostrarTodas, setMostrarTodas] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const perguntasExibidas = mostrarTodas || quantidade == null ? perguntas : perguntas.slice(0, quantidade);

    return (
        <div className="flex flex-col items-center w-full my-8">
            <h3 className="text-font-primary font-light text-4xl mb-8 tracking-normal">DÚVIDAS FREQUENTES</h3>
            
            {adminEdit && (
                <div className="w-full flex justify-between items-center px-16 md:px-36 mb-6">
                    <SectionDivision text={`Total de Perguntas: ${perguntas.length}`} />
                    <Button
                        text="CRIAR PERGUNTA"
                        buttonColor="dark"
                        onClick={() => setCreateOpen(true)}
                    />
                </div>
            )}

            {perguntasExibidas.map((q, idx) => (
                <Question
                    key={q._id}
                    _id={q._id}
                    pergunta={q.pergunta}
                    resposta={q.resposta}
                    delay={idx * 0.2}
                    adminEdit={adminEdit}
                />
            ))}
            {mostrarBotaoVerTodas && !mostrarTodas && quantidade != null && perguntas.length > quantidade && (
                <Button text="Ver Todas" onClick={() => window.location.href = "/sectionPages/arranjos"} />
            )}
            {createOpen && (
                <PerguntaModalEdit
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                    isCreating={true}
                />
            )}
        </div>
    );
}
