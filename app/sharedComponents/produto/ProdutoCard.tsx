import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/sharedComponents/ui/Button';
import { ProdutoModal } from './ProdutoModal';
import { ProdutoModalEdit } from '@/app/adminPage/produtos/components/ProdutoModalEdit';
import { div } from 'framer-motion/client';
import { motion } from 'framer-motion';

interface ProdutoProps {
    imagem: string;
    _id: string;
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

export function ProdutoCard({
    imagem,
    _id,
    nome,
    descricao,
    preco,
    recomendado,
    tipo,
    buttonText,
    buttonLink,
    adminEdit,
    disponiveis,
}: ProdutoProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDeleteClick = () => {
        setDeleteId(_id);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/produtos/${deleteId}`, {
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
            setShowDeleteConfirm(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(`Erro ao deletar produto. Veja console para detalhes.`);
        }
    };

    return (
        <>
            <div className="bg-background-primary rounded-[28px] p-6 flex flex-col w-[300px]
            transition duration-500 ease-in-out hover:scale-102 hover:shadow-xl">
                <div className="w-[250px] h-[250px] mb-4 overflow-hidden rounded-[18px] relative">
                    <Image
                        src={imagem}
                        alt={nome}
                        width={250}
                        height={250}
                        className="object-cover w-full h-full
                        transition duration-500 ease-in-out hover:scale-105"
                    />
                    {recomendado && (
                        <div className="absolute top-2 right-2">
                            <Image
                                src="/icons/star-circle.png"
                                alt="Produto Recomendado"
                                width={32}
                                height={32}
                            />
                        </div>
                    )}
                </div>
                <h2 className="font-bold leading-8 mb-2">{nome}</h2>
                <p className="text-font-primary text-base font-thin mb-4 text-left">
                    Preço: {preco.toFixed(2).replace('.', ',')}
                </p>
                <div className="flex">
                    {!adminEdit && (
                        <Button
                            text={buttonText}
                            onClick={() => setModalOpen(true)}
                            buttonColor="dark"
                        />
                    )}
                    
                    {adminEdit && (
                        <div className='flex'>
                            <Button
                                text="Editar"
                                onClick={() => setEditModalOpen(true)}
                                buttonColor="dark"
                            />
                            <div className="flex ml-2 justify-center items-center
                                cursor-pointer hover:scale-120 transition ease-in-out duration-300"
                                onClick={handleDeleteClick}>
                                <Image
                                    src="/icons/delete.png"
                                    alt="Editar"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {modalOpen && (
                <ProdutoModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    imagem={imagem}
                    nome={nome}
                    descricao={descricao}
                    preco={preco}
                    recomendado={recomendado}
                    tipo={tipo}
                    disponiveis={disponiveis}
                    buttonText={buttonText}
                    buttonLink={buttonLink}
                />
            )}

            {editModalOpen && (
                <ProdutoModalEdit
                    _id={_id} // <-- passando o id aqui
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    imagem={imagem}
                    nome={nome}
                    descricao={descricao}
                    preco={preco}
                    recomendado={recomendado}
                    tipo={tipo}
                    disponiveis={disponiveis}
                    buttonText={buttonText}
                    buttonLink={buttonLink}
                    adminEdit={adminEdit}
                    isCreating={false}
                />
            )}

            {showDeleteConfirm && (
                <motion.div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowDeleteConfirm(false)}
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
                            Tem certeza que deseja remover o produto <strong>"{nome}"</strong>? <br /> Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                text="CANCELAR"
                                buttonColor="black"
                                width="100%"
                                onClick={() => setShowDeleteConfirm(false)}
                            />
                            <Button
                                text="REMOVER"
                                buttonColor="red"
                                width="100%"
                                onClick={handleConfirmDelete}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}