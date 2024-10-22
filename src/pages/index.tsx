import { getBrands } from "@/utils/app/global";
import { Box, Flex, Loader, Text, TextInput, Textarea } from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropzone } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';
import { getFilecontent } from "@/utils/app/train";
import { useChat } from "ai/react";
import ChatMessage from "@/components/Playground/ChatMessage";
const Index = () => {
    const [isTrain, setIsTrain] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [files, setFiles] = useState<String[]>([])
    const { messages, append, setMessages, reload, isLoading } = useChat({
        api: '/api/playground/chat', initialInput: 'test',
        body: {
            query
        }
    });

    useEffect(() => {
        getFiles()
    }, [])

    const handleSend = async () => {
        if (query == "") {
            alert("Input query")
        } else {
            setMessages([]);
            append({
                content: 'test',
                role: "user",
                createdAt: new Date()
            })
        }
    }

    const trainFile = async (file: File) => {
        setIsTrain(true);
        const file_content = await getFilecontent(file);
        try {
            const res = await fetch("/api/train/train_file", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(file_content),
            });
            getFiles()
        } catch (e) {
            console.log(e);
        }
        setIsTrain(false);
    }

    const getFiles = async () => {
        const res = await fetch('/api/train/get_files', {
            method: 'post'
        })
        if (res.status == 200) {
            const data = await res.json();
            setFiles(data)
        }
    }

    return (
        <Box p={20}>
            <Flex justify={'center'} gap={40} w={'100%'}>
                <Flex direction={'column'} gap={20}>
                    <Dropzone
                        accept={{
                            'image/*': [], // All images
                            'text/html': ['.html', '.htm', '.pdf', '.doc', '.docx', '.xls', '.csv', '.xlsx'],
                        }}
                        bg={'#F4F6F8'}
                        pt={30}
                        pb={30}
                        w={'300px'}
                        onDrop={(files) => {
                            trainFile(files[0])
                        }}
                        loading={isTrain}
                    >
                        <Flex
                            justify={'center'}
                            gap={5}
                            direction={'column'}
                            align={'center'}
                        >
                            <IconUpload color="#919EAB" />
                            <Text color="#919EAB" size={14}>
                                Drag files here to upload
                            </Text>
                            <Text color="#18232A" size={13}
                                weight={500}
                                sx={(theme) => ({
                                    textDecoration: 'underline'
                                })}
                            >
                                or browse for files
                            </Text>
                        </Flex>
                    </Dropzone>
                    <Box>
                        <Textarea w={'500px'}
                            value={query}
                            onChange={(event) => {
                                setQuery(event.currentTarget.value)
                            }}
                            onKeyDown={(event) => {
                                if (event.keyCode == 13) {
                                    handleSend()
                                }
                            }}
                            disabled={isLoading}
                            rightSection={
                                isLoading ?
                                    <Loader size={20} /> : <></>
                            }
                        />
                    </Box>
                    <Box w={500}>
                        <ChatMessage
                            message={messages?.[1]?.content}
                        />
                    </Box>
                </Flex>
                <Box>
                    <Text size={20}>
                        File List
                    </Text>
                    <Flex direction={'column'} gap={15} mt={25}>
                        {
                            files.length == 0 ?
                                <Box>
                                    No Uploaded Files
                                </Box> :
                                files.map((item: any, index) =>
                                    <Text key={index}>
                                        . {item.name}
                                    </Text>
                                )
                        }
                    </Flex>
                </Box>

            </Flex>

        </Box>
    )
}

export default Index;