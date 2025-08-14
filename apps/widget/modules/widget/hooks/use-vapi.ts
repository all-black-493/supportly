import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role:"user" | "assistant";
    text: string;
}

export const useVapi = () =>{
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(()=>{
        const vapiInstance = new Vapi("cf22e523-dc18-455f-8a93-0f2b922ce473");
        setVapi(vapiInstance)
        vapiInstance.on("call-end",()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        })

        vapiInstance.on("speech-start",()=>{
            setIsSpeaking(true);
        })

        vapiInstance.on("speech-end",()=>{
            setIsSpeaking(false)
        })

        vapiInstance.on("error", (error)=>{
            console.log(error,"VAPI_ERROR");
            setIsConnecting(false);
        })

        vapiInstance.on("message",(message)=>{
            if(message.type === "transcript" && message.transcriptType ==="final"){
                setTranscript((prev)=>[
                    ...prev,
                    {
                        role: message.role ==="user"? "user":"assistant",
                        text:message.transcript,
                    }
                ])
            }
        })

        return ()=>{
            vapiInstance?.stop();
        }
    },[])

    const startCall = () => {
        setIsConnecting(true);
        if(vapi){
            vapi.start("5c503dab-7f3a-4869-b9ce-b37aa58edca0")
        };
    }

    const endCall = ()=> {
        if(vapi){
            vapi.stop()
        }
    }

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall,
    }
}