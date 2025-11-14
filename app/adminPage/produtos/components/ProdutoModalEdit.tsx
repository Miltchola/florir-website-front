import { ReactNode, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/sharedComponents/ui/Button';
import { div } from 'framer-motion/client';
import { TextField } from '@/app/login/components/TextField';


interface ProdutoModalProps {
    _id?: string;
    open: boolean;
    onClose: () => void;
    imagem?: string;
    nome?: string;
    descricao?: string;
    preco?: number;
    recomendado?: boolean;
    tipo?: string;
    disponiveis?: number;
    buttonText?: string;
    buttonLink?: (() => void);
    children?: ReactNode;
    adminEdit?: boolean;
    isCreating?: boolean;
}

export function ProdutoModalEdit({
    open,
    onClose,
    imagem,
    _id,
    nome,
    descricao,
    preco,
    recomendado,
    tipo,
    disponiveis,
    buttonText,
    buttonLink,
    adminEdit = false,
    isCreating = false,
}: ProdutoModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const [titulo, setTitulo] = useState(isCreating ? "" : (nome ?? ""));
    const [isRecomendado, setIsRecomendado] = useState(recomendado ?? false);
    const [isPreco, setPreco] = useState(isCreating ? "" : (preco?.toString() ?? "0"));
    const [descricaoLocal, setDescricaoLocal] = useState(isCreating ? "" : (descricao ?? ""));
    const [isDisponiveis, setDisponiveis] = useState(disponiveis ?? 0);
    const [selectedTipo, setSelectedTipo] = useState(isCreating ? "Arranjos" : (tipo ?? "Arranjos"));
    
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrlState, setPreviewUrl] = useState<string | null>(imagem ?? null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        setIsRecomendado(recomendado ?? false);
    }, [recomendado]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('imagem', selectedFile);
            } else {
                formData.append('imagem', previewUrlState ?? '/images/placeholder.png');
            }

            formData.append('nome', titulo ?? '');
            formData.append('descricao', descricaoLocal ?? '');
            formData.append('preco', String(isPreco ? parseFloat(isPreco.replace(',', '.')) : 0));
            formData.append('recomendado', String(isRecomendado));
            formData.append('tipo', selectedTipo ?? 'Arranjos');
            formData.append('disponiveis', String(Number(isDisponiveis ?? 0)));

        
            const method = isCreating ? 'POST' : 'PATCH';
            const endpoint = isCreating 
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/produtos`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/produtos/${_id}`;

            const res = await fetch(endpoint, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Erro ao ${isCreating ? 'criar' : 'atualizar'} produto (${res.status}): ${text}`);
            }

            alert(`Produto ${isCreating ? 'criado' : 'atualizado'} com sucesso!`);
            // cleanup: liberar objectURL se houver
            if (previewUrlState && previewUrlState.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrlState);
            }
            onClose();
            window.location.reload();

        } catch (error) {
            console.error(error);
            alert(`Erro ao ${isCreating ? 'criar' : 'atualizar'} produto. Veja console para detalhes.`);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/produtos/${_id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                alert("Erro ao deletar produto. Tente novamente.");
                return;
            }
            alert("Produto deletado com sucesso!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(`Erro ao deletar produto. Veja console para detalhes.`);
        }
        setShowConfirmDelete(false);
    }

    useEffect(() => {
        if (!open) {
            if (previewUrlState && previewUrlState.startsWith('blob:')) URL.revokeObjectURL(previewUrlState);
            setSelectedFile(null);
            setPreviewUrl(isCreating ? '/images/placeholder.png' : (imagem ?? null));
        }
    }, [open, imagem, isCreating]);

    const handleChooseFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Escolha uma imagem válida.');
            return;
        }

        if (previewUrlState && previewUrlState.startsWith('blob:')) URL.revokeObjectURL(previewUrlState);
        const url = URL.createObjectURL(file);
        setSelectedFile(file);
        setPreviewUrl(url);
    };

    const handleRemoveImage = () => {
        if (previewUrlState && previewUrlState.startsWith('blob:')) URL.revokeObjectURL(previewUrlState);
        setSelectedFile(null);
        setPreviewUrl('/images/placeholder.png'); // assume placeholder como fallback
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="product-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Fundo escurecido */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={onClose}
                    />
                    {/* Modal centralizado */}
                    <motion.div
                        className="relative rounded-[32px] p-6 md:p-10
                            max-w-[900px] w-full flex flex-col md:flex-row
                            gap-8 shadow-2xl z-10 bg-[#FCECEC] overflow-y-auto modal-scrollbar"
                        style={{ maxHeight: 'calc(100vh - 40px)' }}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center md:items-start flex-shrink-0 mb-4 md:mb-0 min-w-[220px]">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />

                            {previewUrlState && (previewUrlState.startsWith('blob:') || previewUrlState.startsWith('data:')) ? (
                                <img
                                    src={previewUrlState}
                                    alt={nome ?? 'Produto'}
                                    className="rounded-[20px] object-cover w-[220px] h-[220px] mb-4"
                                />
                            ) : (
                                <Image
                                    src={previewUrlState ?? '/images/placeholder.png'}
                                    alt={nome ?? 'Produto'}
                                    width={220}
                                    height={220}
                                    className="rounded-[20px] object-cover w-[220px] h-[220px] mb-4"
                                />
                            )}
                            <div className="mt-2 w-full flex-col items-center justify-center">
                                    <div className="mb-4">
                                        <Button text={!previewUrlState ? "INSERIR IMAGEM" : "Trocar Imagem"} buttonColor="dark" width="100%" onClick={handleChooseFile} />
                                    </div>
                                    {previewUrlState && (
                                        <Button text="Remover Imagem" buttonColor="dark" width="100%" onClick={handleRemoveImage} />
                                    )}
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            {/* Campo: Produto do Mês */}
                            <div className="flex items-center gap-3 mb-4">
                                <label htmlFor="produtoMes" className="text-font-primary text-xl font-semibold ml-2">
                                    Produto do Mês?
                                </label>
                                <input
                                    id="produtoMes"
                                    type="checkbox"
                                    checked={isRecomendado}
                                    onChange={() => setIsRecomendado(prev => !prev)}
                                    className="w-5 h-5 cursor-pointer accent-[#1E1E1E] rounded-md focus:ring-2 focus:ring-font-primary"
                                />
                                <span className="text-font-primary text-base select-none">
                                    {isRecomendado ? "Sim" : "Não"}
                                </span>
                            </div>


                            <TextField
                                title="Título do Produto"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                color='white'
                                placeholder="Escolha o Título do Produto"
                            />
                            <div className="mb-4">
                                <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Tipo de Produto</span>
                                <select
                                    value={selectedTipo}
                                    onChange={(e) => setSelectedTipo(e.target.value)}
                                    className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition"
                                >
                                    <option value="Acessórios">Acessórios</option>
                                    <option value="Arranjos">Arranjos</option>
                                    <option value="Buquês">Buquês</option>
                                    <option value="Casamento">Casamento</option>
                                    <option value="Cúpulas">Cúpulas</option>
                                    <option value="Quadros">Quadros</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Descrição</span>
                                <textarea
                                    className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition resize-none"
                                    rows={3}
                                    value={descricaoLocal}
                                    onChange={(e) => setDescricaoLocal(e.target.value)}
                                    placeholder="Escreva uma Descrição do Produto"
                                />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <TextField
                                    title="Preço"
                                    value={isPreco}
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(',', '.'); // permite digitar vírgula
                                        if (/^\d*\.?\d{0,2}$/.test(value)) { // só números e até 2 casas decimais
                                        setPreco(value);
                                        }
                                    }}
                                    color='white'
                                    placeholder="0.00"
                                />
                                <div className="flex-1">
                                    <TextField
                                        title="Disponíveis"
                                        value={isDisponiveis.toString()}
                                        type="text"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === "" || /^\d+$/.test(value)) {
                                                setDisponiveis(value === "" ? 0 : Number(value));
                                            }
                                        }}
                                        color="white"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            {!isCreating &&(
                            <div className="flex gap-4 mb-2">
                                <Button text="REMOVER PRODUTO" buttonColor="red" isDelete={true} width="100%" onClick={() => setShowConfirmDelete(true)}/>
                            </div>
                            )}
                            <div className="flex gap-4 pb-12">
                                <Button text={isCreating ? "CRIAR" : "ATUALIZAR"} buttonColor="dark" width="50%" onClick={handleUpdate} />
                                <Button text="CANCELAR" buttonColor="black" width="50%" onClick={onClose} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            
            {/* Modal de Confirmação de Exclusão */}
            {showConfirmDelete && (
                <motion.div
                    key="confirm-delete-modal"
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowConfirmDelete(false)}
                >
                    <motion.div
                        className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full mx-4 shadow-2xl"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-font-primary mb-4">Confirmar Exclusão</h2>
                        <p className="text-sm md:text-base text-font-primary mb-6 leading-relaxed">
                            Tem certeza que deseja remover o produto <strong>"{titulo}"</strong>? <br /> Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                text="CANCELAR"
                                buttonColor="black"
                                width="100%"
                                onClick={() => setShowConfirmDelete(false)}
                            />
                            <Button
                                text="REMOVER"
                                buttonColor="red"
                                width="100%"
                                onClick={handleDelete}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}