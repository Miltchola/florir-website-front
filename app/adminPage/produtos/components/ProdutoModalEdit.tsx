import { ReactNode, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/sharedComponents/ui/Button';
import { div } from 'framer-motion/client';
import { TextField } from '@/app/login/components/TextField';


interface ProdutoModalProps {
    _id: string;
    open: boolean;
    onClose: () => void;
    imagem: string;
    nome: string;
    descricao: string;
    preco: number;
    recomendado: boolean;
    tipo: string;
    disponiveis?: number;
    buttonText: string;
    buttonLink?: (() => void);
    children?: ReactNode;
    adminEdit?: boolean;
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

    const [titulo, setTitulo] = useState(nome);
    const [isRecomendado, setIsRecomendado] = useState(recomendado);
    const [isPreco, setPreco] = useState(preco.toString());
    const [descricaoLocal, setDescricaoLocal] = useState(descricao);
    const [isDisponiveis, setDisponiveis] = useState(disponiveis ?? 0);
    const [selectedTipo, setSelectedTipo] = useState(tipo);

    useEffect(() => {
        setIsRecomendado(recomendado);
    }, [recomendado]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        try {
            const fileToBase64 = (file: File): Promise<string> =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result));
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

            const uploadImage = async (file: File) => {
                const form = new FormData();
                form.append('image', file);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    } as any,
                    body: form,
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error('Erro no upload da imagem: ' + text);
                }
                const data = await res.json();
                return data.url ?? data.data?.url;
            };

            let imagemParaEnviar: string | null = imagem ?? null; 

            // caso o usuário tenha removido a imagem explicitamente:
            if (previewUrl === null && !selectedFile) {
                // envie "" ou null dependendo do backend; aqui envio empty string
                imagemParaEnviar = '';
            }
            // se o usuário escolheu um novo arquivo, faça upload ou converta para base64
            if (selectedFile) {
             // converter para base64 e enviar no PATCH (fallback universal) ---
                try {
                    imagemParaEnviar = await fileToBase64(selectedFile);
                } catch (err) {
                    console.error('Erro ao converter imagem para base64', err);
                }
            }

            const payload = {
                imagem: imagemParaEnviar,
                nome: titulo,
                descricao: descricaoLocal,
                preco: isPreco ? parseFloat(isPreco.replace(',', '.')) : 0,
                recomendado: isRecomendado,
                tipo: selectedTipo,
                disponiveis: Number(isDisponiveis ?? 0),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/produtos/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Erro ao atualizar produto (${res.status}): ${text}`);
            }

            // sucesso
            alert('Produto atualizado com sucesso!');
            // cleanup: liberar objectURL se houver
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            onClose(); // fecha o modal
            // recarrega a página para garantir lista atualizada
            window.location.reload();

        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar produto. Veja console para detalhes.');
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(imagem ?? null);

    useEffect(() => {
    if (!open) {
        if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        setSelectedFile(null);
        setPreviewUrl(imagem ?? null);
    }
    }, [open, imagem]);

    const handleChooseFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // validação simples
        if (!file.type.startsWith('image/')) {
            alert('Escolha uma imagem válida.');
            return;
        }
        // libera URL anterior se necessário
        if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        const url = URL.createObjectURL(file);
        setSelectedFile(file);
        setPreviewUrl(url);
    };

    const handleRemoveImage = () => {
        if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        setSelectedFile(null);
        setPreviewUrl(null); // ou set to placeholder "/images/placeholder.jpg"
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
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

                            {previewUrl && (previewUrl.startsWith('blob:') || previewUrl.startsWith('data:')) ? (
                                <img
                                    src={previewUrl}
                                    alt={nome}
                                    className="rounded-[20px] object-cover w-[220px] h-[220px] mb-4"
                                />
                            ) : (
                                <Image
                                    src={previewUrl ?? '/images/placeholder.png'}
                                    alt={nome}
                                    width={220}
                                    height={220}
                                    className="rounded-[20px] object-cover w-[220px] h-[220px] mb-4"
                                />
                            )}
                            <div className="mt-2 w-full flex-col items-center justify-center">
                                <div className="mb-4">
                                    <Button text="Trocar Imagem" buttonColor="dark" width="100%" onClick={handleChooseFile} />
                                </div>
                                <Button text="Remover Imagem" buttonColor="dark" width="100%" onClick={handleRemoveImage} />
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
                                    {/*
                                    <span className="text-base text-font-primary font-normal mb-2 ml-2 block">Disponíveis</span>
                                    <select className="w-full rounded-2xl px-6 py-4 text-lg text-font-primary bg-[#fff] border-none outline-none focus:ring-2 focus:ring-font-primary transition">
                                        <option>{disponiveis ?? 0}</option>
                                    </select>*/}
                                </div>
                            </div>

                            <div className="flex gap-4 mb-2">
                                <Button text="REMOVER PRODUTO" buttonColor="red" isDelete={true} width="100%" />
                            </div>
                            <div className="flex gap-4 pb-12">
                                <Button text="ATUALIZAR" buttonColor="dark" width="50%" onClick={handleUpdate} />
                                <Button text="CANCELAR" buttonColor="black" width="50%" onClick={onClose} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}