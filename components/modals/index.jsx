import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import Button from "../lunar/Button";

const TransactionModal = ({ isOpen, onClose, type = 'deposit' }) => {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async () => {
        // Handle submit logic here
        const transaction = {
            type,
            amount,
            address
        };
        console.log("Transaction details:", transaction);
        onClose();
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 20
    };

    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/25 backdrop-opacity-20"
                }}
            >
                <ModalContent className="bg-black-tr">
                    <button
                        onClick={onClose}
                        style={closeButtonStyle}
                        className="flex items-center text-white uppercase hover:text-basement-cyan font-basement"
                    >
                        Close | X
                    </button>
                    <ModalHeader className="flex flex-col gap-1 font-basement text-basement-cyan">
                        {type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
                    </ModalHeader>

                    <ModalBody className="font-aeonik text-white">
                        <Input
                            autoFocus
                            type="number"
                            label="Amount"
                            placeholder="Enter amount"
                            variant="bordered"
                            value={amount}
                            onChange={handleAmountChange}
                            classNames={{
                                label: "text-xs font-basement text-basement-cyan pb-8",
                            }}
                        />
                        <Input
                            label="Wallet Address"
                            placeholder="Enter wallet address"
                            variant="bordered"
                            value={address}
                            onChange={handleAddressChange}
                            classNames={{
                                label: "text-xs font-basement text-basement-cyan pb-8",
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            text={type === 'deposit' ? 'Deposit' : 'Withdraw'}
                            onClick={handleSubmit}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TransactionModal;
