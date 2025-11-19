import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/sharedComponents/ui/Button';
import { TextField } from '@/app/login/components/TextField';

interface PerguntaModalEditProps {
  _id?: string;
  pergunta?: string;
  resposta?: string;
  open: boolean;
  onClose: () => void;
  isCreating?: boolean;
  children?: ReactNode;
}

export function PerguntaModalEdit({
  _id,
  pergunta = '',
  resposta = '',
  open,
  onClose,
  isCreating = false,
}: PerguntaModalEditProps) {
  const [perguntaLocal, setPerguntaLocal] = useState(pergunta ?? '');
  const [respostaLocal, setRespostaLocal] = useState(resposta ?? '');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sincroniza quando modal abrir / props mudarem
  useEffect(() => {
    if (isCreating) {
      setPerguntaLocal('');
      setRespostaLocal('');
    } else {
      setPerguntaLocal(pergunta ?? '');
      setRespostaLocal(resposta ?? '');
    }
  }, [pergunta, resposta, open, isCreating]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isValid = perguntaLocal.trim().length > 0 && respostaLocal.trim().length > 0;

  const handleSave = async () => {
    if (!isValid) {
      alert('Preencha a pergunta e a resposta antes de salvar.');
      return;
    }
    const token = localStorage.getItem('authToken');
    if (!token) { alert('Você precisa estar logado.'); return; }

    setIsSaving(true);
    try {
      const payload = {
        question: perguntaLocal.toString(),
        answer: respostaLocal.toString(),
      };

      const method = isCreating ? 'POST' : 'PATCH';
      const endpoint = isCreating
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/perguntas`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/perguntas/${_id}`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao ${isCreating ? 'criar' : 'atualizar'} pergunta (${res.status}): ${text}`);
      }

      alert(`Pergunta ${isCreating ? 'criada' : 'atualizada'} com sucesso!`);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(`Erro ao ${isCreating ? 'criar' : 'atualizar'} pergunta. Veja console para detalhes.`);
    } finally {
      setIsSaving(false);
      setShowConfirmDelete(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Você precisa estar logado.');
      return;
    
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/perguntas/${_id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert('Erro ao deletar pergunta. Tente novamente.');
        return;
      }

      alert('Pergunta deletada com sucesso!');
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar pergunta. Veja console para detalhes.');
    } finally {
      setShowConfirmDelete(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pergunta-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            className="relative rounded-[32px] p-6 md:p-10 max-w-[900px] w-full gap-8 shadow-2xl z-10 bg-[#FCECEC] overflow-y-auto modal-scrollbar"
            style={{ maxHeight: 'calc(100vh - 40px)' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-font-primary mb-2 text-center">
              {isCreating ? 'Criar Pergunta' : 'Editar Pergunta'}
            </h2>

            <TextField
              title="Pergunta"
              value={perguntaLocal}
              onChange={(e) => setPerguntaLocal(e.target.value)}
              placeholder="Descreva a Pergunta"
              color="white"
            />

            <div className="mb-4">
              <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Resposta</span>
              <textarea
                className="w-full h-40 rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition resize-none"
                rows={6}
                value={respostaLocal}
                onChange={(e) => setRespostaLocal(e.target.value)}
                placeholder="Descreva a Resposta"
              />
            </div>

            <div className="flex gap-4 mt-6">
              {!isCreating && (
                <Button text="REMOVER PERGUNTA" buttonColor="red" isDelete={true} onClick={() => setShowConfirmDelete(true)} />
              )}
              <Button text={isCreating ? 'CRIAR' : 'ATUALIZAR'} buttonColor="dark" onClick={handleSave} />
              <Button text="CANCELAR" buttonColor="black" onClick={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {showConfirmDelete && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setShowConfirmDelete(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full mx-4 shadow-2xl"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl font-bold text-font-primary mb-4">Confirmar Exclusão</h2>
            <p className="text-sm md:text-base text-font-primary mb-6 leading-relaxed">
              Tem certeza que deseja remover a pergunta <strong>"{perguntaLocal}"</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button text="CANCELAR" buttonColor="black" width="100%" onClick={() => setShowConfirmDelete(false)} />
              <Button text="REMOVER" buttonColor="red" width="100%" onClick={handleDelete} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}